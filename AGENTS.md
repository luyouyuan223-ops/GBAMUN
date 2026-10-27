# 项目技术上下文

## Dependencies
- **@supabase/supabase-js** - Supabase 客户端库,用于数据库、认证、存储操作
- **sonner** - Toast 通知组件,用于用户反馈
- **react-router-dom** - 前端路由
- **framer-motion** - 动画
- **recharts** - 图表
- **lucide-react** - 图标

## Architecture
- **构建**: Webpack 5 + Babel + TypeScript + Tailwind CSS 3
- **Edge Functions**: `/functions/export-data` (数据导出), `/functions/backup-data` (自动备份)
- **数据库表**: `project_data` (业务数据), `storage.buckets` (backups 存储桶)
- **前端组件**: `DataExport.tsx` (数据导出 UI)
- **认证模式**: 匿名优先,RLS 策略允许公开读写
- **自动生成文件**: `src/supabase/client.ts`、`src/supabase/cloud-env.generated.ts` 由 Meoo Cloud 管理,勿手改

## Patterns / Constraints
- Edge Function 必须处理 CORS 预检请求
- RLS 策略名使用英文 snake_case,格式 `<scope>_<action>_<table>`
- 写操作必须用 `.select()` 校验影响行数,避免 RLS 静默失败
- Storage 备份文件命名格式: `backup_YYYY-MM-DDTHH-mm-ss.json`
- 自动清理 30 天前的备份文件
- 开发端口 3266 (webpack devServer)

## What Didn't Work
- ❌ backup-data 函数初始版本: `file.created_at` 可能为 null,导致 Date 构造函数类型错误 → 添加空值检查

## 打包交付
- 完整源码打包脚本: 排除 node_modules/dist/tmp/.git/skills 等,包含 src/functions/migrations/public 及所有配置文件与文档
- 交付物位于 `/home/user-files/outputs/website-full-source-*.tar.gz`