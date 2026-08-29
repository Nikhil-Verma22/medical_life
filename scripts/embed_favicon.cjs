const fs = require('fs');
const path = require('path');

const imgBuffer = fs.readFileSync(path.join(__dirname, '../public/favicon.png'));
const base64 = imgBuffer.toString('base64');
const dataUri = 'data:image/png;base64,' + base64;

const files = [
  path.join(__dirname, '../form-filling/index.html'),
  path.join(__dirname, '../public/form-filling/index.html')
];

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  
  const faviconBlock = `  <!-- High Priority Favicon with Data URI and Cache Busters -->
  <link rel="icon" type="image/png" href="${dataUri}">
  <link rel="icon" type="image/png" href="/favicon.png?v=99">
  <link rel="icon" type="image/png" href="./favicon.png?v=99">
  <link rel="shortcut icon" href="${dataUri}">
  <link rel="apple-touch-icon" href="${dataUri}">`;

  if (html.includes('<!-- Favicon -->')) {
    html = html.replace(/<!-- Favicon -->[\s\S]*?<link rel="apple-touch-icon"[^>]*>/, faviconBlock);
  } else if (html.includes('<head>')) {
    html = html.replace('<head>', '<head>\n' + faviconBlock);
  }

  fs.writeFileSync(file, html, 'utf8');
  console.log('Updated favicon in:', file);
}
