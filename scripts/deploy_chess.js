import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('chess/vibechess-main/client/dist');
const destDir = path.resolve('public/vibechess');

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) {
    console.error(`Source directory does not exist: ${from}`);
    return;
  }
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  fs.readdirSync(from).forEach((element) => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    if (fs.lstatSync(fromPath).isDirectory()) {
      copyFolderSync(fromPath, toPath);
    } else {
      fs.copyFileSync(fromPath, toPath);
    }
  });
}

console.log('Deploying built vibechess client files to public/vibechess...');
copyFolderSync(srcDir, destDir);
console.log('✅ Deployment successful!');
