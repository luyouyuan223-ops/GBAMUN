import { useLanguage } from '../i18n/LanguageContext';
import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { supabase, getSupabaseUrl } from '../supabase/client';

export function DataExport() {
  const { t } = useLanguage();
  const [exporting, setExporting] = useState(false);
  const [format, setFormat] = useState<'json' | 'csv'>('json');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleExport = async () => {
    setExporting(true);
    setMessage(null);
    try {
      const session = (await supabase.auth.getSession()).data.session;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (session) {
        headers.Authorization = `Bearer ${session.access_token}`;
      }

      const response = await fetch(`${getSupabaseUrl()}/functions/v1/export-data`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          tableName: 'project_data',
          format,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || t('导出失败'));
      }

      // 下载文件
      const blob = new Blob([result.data], {
        type: format === 'csv' ? 'text/csv' : 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `export_${new Date().getTime()}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setMessage({ type: 'success', text: t('成功导出 {count} 条数据').replace('{count}', String(result.count)) });
    } catch (error) {
      const text = error instanceof Error ? error.message : t('导出失败');
      setMessage({ type: 'error', text });
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">{t('导出格式:')}</label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value as 'json' | 'csv')}
          className="px-3 py-2 border rounded-md"
        >
          <option value="json">JSON</option>
          <option value="csv">CSV</option>
        </select>
      </div>

      <button
        onClick={handleExport}
        disabled={exporting}
        className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground disabled:opacity-50"
      >
        {exporting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />{t('导出中...')}</>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />{t('导出数据')}</>
        )}
      </button>

      {message && (
        <p className={message.type === 'success' ? 'text-sm text-green-600' : 'text-sm text-red-600'}>
          {message.text}
        </p>
      )}
    </div>
  );
}