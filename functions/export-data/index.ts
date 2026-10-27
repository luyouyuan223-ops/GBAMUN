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
    const { data, error } = await req.json();
    const tableName = data?.tableName || 'project_data';
    const format = data?.format || 'json'; // json | csv

    // 使用 Service Role Key 绕过 RLS,获取全量数据
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: rows, error: queryError } = await supabaseAdmin
      .from(tableName)
      .select('*');

    if (queryError) {
      throw new Error(queryError.message);
    }

    let exportData;
    if (format === 'csv') {
      exportData = convertToCSV(rows);
    } else {
      exportData = JSON.stringify(rows, null, 2);
    }

    return new Response(JSON.stringify({
      success: true,
      count: rows.length,
      data: exportData,
      exportedAt: new Date().toISOString(),
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

function convertToCSV(data: any[]): string {
  if (data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // 处理包含逗号或换行的值
        if (typeof value === 'string' && (value.includes(',') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value ?? '';
      }).join(',')
    )
  ];
  
  return csvRows.join('\n');
}

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
