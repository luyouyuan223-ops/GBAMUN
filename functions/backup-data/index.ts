Deno.serve(async (req) => {
  // CORS 预检
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    // 验证请求来源(可选:添加 API Key 验证)
    const apiKey = req.headers.get('x-api-key');
    const expectedKey = Deno.env.get('BACKUP_API_KEY');
    
    if (expectedKey && apiKey !== expectedKey) {
      throw new Error('未授权的访问');
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // 导出所有业务表
    const tables = ['project_data']; // 可扩展更多表
    const backup: Record<string, any[]> = {};

    for (const table of tables) {
      const { data, error } = await supabaseAdmin
        .from(table)
        .select('*');

      if (error) {
        console.error(`Failed to export ${table}:`, error.message);
        continue;
      }

      backup[table] = data || [];
    }

    // 存储到 Storage Bucket(需要先在数据库中创建 bucket)
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `backup_${timestamp}.json`;
    const backupData = JSON.stringify(backup, null, 2);

    const { error: uploadError } = await supabaseAdmin.storage
      .from('backups')
      .upload(fileName, new TextEncoder().encode(backupData), {
        contentType: 'application/json',
      });

    if (uploadError) {
      throw new Error(`上传备份失败: ${uploadError.message}`);
    }

    // 清理旧备份(保留最近 30 天)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: oldFiles } = await supabaseAdmin.storage
      .from('backups')
      .list();

    if (oldFiles) {
      for (const file of oldFiles) {
        if (!file.created_at) continue;
        const fileDate = new Date(file.created_at);
        if (fileDate < thirtyDaysAgo) {
          await supabaseAdmin.storage
            .from('backups')
            .remove([file.name]);
        }
      }
    }

    return new Response(JSON.stringify({
      success: true,
      fileName,
      tableCount: Object.keys(backup).length,
      totalRecords: Object.values(backup).reduce((sum, arr) => sum + arr.length, 0),
      message: '备份成功',
    }), { headers: corsHeaders });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ 
      success: false, 
      error: message 
    }), {
      status: 400,
      headers: corsHeaders,
    });
  }
});

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
