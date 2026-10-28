const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
fs.cpSync(path.join(root, 'public'), path.join(root, 'dist'), { recursive: true });
fs.copyFileSync(path.join(root, 'CNAME'), path.join(root, 'dist', 'CNAME'));
fs.writeFileSync(path.join(root, 'dist', '.nojekyll'), '');
