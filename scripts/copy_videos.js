const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '../chess/vibechess-main/client/public/videos/v1.mp4');
const targetDir = path.join(__dirname, '../chess/vibechess-main/client/public/videos');

console.log('Copying v1.mp4 to v1.mp4 ... v10.mp4');

for (let i = 1; i <= 10; i++) {
  const dest = path.join(targetDir, 'v' + i + '.mp4');
  fs.copyFileSync(src, dest);
  console.log('Created:', dest);
}

console.log('Done creating video clips v1 to v10!');
