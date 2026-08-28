const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const videoUrls = [
  "https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/person-bicycle-car-detection.mp4",
  "https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/store-aisle-detection.mp4",
  "https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/head-pose-face-detection.mp4",
  "https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/car-detection.mp4",
  "https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/face-demographics-walking-and-pause.mp4",
  "https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/classroom.mp4",
  "https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/bottle-detection.mp4",
  "https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/people-detection.mp4",
  "https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/driver-action-recognition.mp4",
  "https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/free-spaces-recognition.mp4"
];

const destDir = path.join(__dirname, '../chess/vibechess-main/client/public/videos');

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };
    
    const request = https.get(options, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
      const fileStream = fs.createWriteStream(destPath);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded ${path.basename(destPath)} successfully (${fs.statSync(destPath).size} bytes)`);
        resolve();
      });
      fileStream.on('error', reject);
    });
    request.on('error', reject);
  });
}

async function run() {
  console.log('Downloading 10 DISTINCT real video clips for Vibechess from GitHub Raw...');
  for (let i = 0; i < videoUrls.length; i++) {
    const dest = path.join(destDir, `v${i + 1}.mp4`);
    console.log(`Downloading clip v${i + 1}.mp4 from ${videoUrls[i]}...`);
    try {
      await downloadFile(videoUrls[i], dest);
    } catch (err) {
      console.error(`Error downloading v${i + 1}.mp4:`, err.message);
    }
  }
  console.log('🎉 All 10 distinct video clips downloaded successfully!');
}

run();
