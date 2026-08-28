const fs = require('fs');
const path = require('path');

const userVideosDir = path.resolve('videos');
const chessPublicVideosDir = path.resolve('chess/vibechess-main/client/public/videos');
const distPublicVideosDir = path.resolve('public/vibechess/videos');

if (!fs.existsSync(userVideosDir)) {
  console.error('Directory "videos" not found!');
  process.exit(1);
}

fs.mkdirSync(chessPublicVideosDir, { recursive: true });
fs.mkdirSync(distPublicVideosDir, { recursive: true });

const files = fs.readdirSync(userVideosDir).filter(f => f.endsWith('.mp4'));
// Sort files alphabetically so v1, v2, v3... order is deterministic
files.sort();

console.log(`Found ${files.length} user video files in ${userVideosDir}:`);

const playlist = [];

files.forEach((file, index) => {
  const videoNum = index + 1;
  const targetName = `v${videoNum}.mp4`;
  const srcPath = path.join(userVideosDir, file);
  const sizeMB = (fs.statSync(srcPath).size / (1024 * 1024)).toFixed(2);

  console.log(`Processing [${videoNum}]: "${file}" -> ${targetName} (${sizeMB} MB)`);

  const chessDest = path.join(chessPublicVideosDir, targetName);
  const distDest = path.join(distPublicVideosDir, targetName);

  fs.copyFileSync(srcPath, chessDest);
  fs.copyFileSync(srcPath, distDest);

  playlist.push(`/vibechess/videos/${targetName}`);
});

console.log('\nGenerated Playlist:');
console.log(JSON.stringify(playlist, null, 2));

console.log(`\n🎉 Successfully processed and copied ${files.length} original user videos!`);
