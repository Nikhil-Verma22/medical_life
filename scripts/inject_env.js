import fs from 'fs';
import path from 'path';

// Load variables from .env file manually if it exists (to avoid requiring dotenv dependency)
function loadEnv() {
  const envPath = path.resolve('.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach((line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        // Remove surrounding quotes if present
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        } else if (value.startsWith("'") && value.endsWith("'")) {
          value = value.slice(1, -1);
        }
        process.env[key] = value.trim();
      }
    });
  }
}

loadEnv();

const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://rupdketviytkavqjxwro.supabase.co";
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_rseXSzTGdyslPCb1lfXfRQ_o3ToFITO";

const paths = [
  path.resolve('.output/public/form-filling/index.html'),
  path.resolve('dist/form-filling/index.html'),
];

let injected = false;

paths.forEach((targetPath) => {
  if (fs.existsSync(targetPath)) {
    console.log(`Injecting environment variables into ${targetPath}...`);
    let content = fs.readFileSync(targetPath, 'utf8');
    
    content = content.replace(/___SUPABASE_URL___/g, supabaseUrl);
    content = content.replace(/___SUPABASE_ANON_KEY___/g, supabaseAnonKey);
    
    fs.writeFileSync(targetPath, content, 'utf8');
    console.log(`✅ Injection complete for ${targetPath}!`);
    injected = true;
  }
});

if (!injected) {
  console.warn(`⚠️ Warning: Built files not found in paths: ${paths.join(', ')}. Make sure to run after build step.`);
}
