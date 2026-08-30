import fs from 'fs';
import path from 'path';

// Load variables from .env file manually if it exists
function loadEnv() {
  const envPath = path.resolve('.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach((line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
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

const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://jvyudlqbzknossfcfrqd.supabase.co";
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2eXVkbHFiemtub3NzZmNmcnFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NDgxNzgsImV4cCI6MjEwMzQyNDE3OH0.gRktWCMQJlQA2h08kCKj53l2nfXGGRenF7oB-KWdii4";

const geminiKey = process.env.GEMINI_API_KEY || "";

const paths = [
  path.resolve('.output/public/form-filling/index.html'),
  path.resolve('dist/form-filling/index.html'),
  path.resolve('public/form-filling/index.html'),
  path.resolve('form-filling/index.html'),
];

let injected = false;

paths.forEach((targetPath) => {
  if (fs.existsSync(targetPath)) {
    console.log(`Injecting environment variables into ${targetPath}...`);
    let content = fs.readFileSync(targetPath, 'utf8');
    
    content = content.replace(/___SUPABASE_URL___/g, supabaseUrl);
    content = content.replace(/___SUPABASE_ANON_KEY___/g, supabaseAnonKey);
    // Replace old legacy fallback URL if present in any file
    content = content.replace(/https:\/\/rupdketviytkavqjxwro\.supabase\.co/g, supabaseUrl);
    content = content.replace(/sb_publishable_rseXSzTGdyslPCb1lfXfRQ_o3ToFITO/g, supabaseAnonKey);
    
    fs.writeFileSync(targetPath, content, 'utf8');
    console.log(`✅ Injection complete for ${targetPath}!`);
    injected = true;
  }
});

// Inject server-side secret vars into .output/server/wrangler.json for Cloudflare Workers
const serverWranglerPath = path.resolve('.output/server/wrangler.json');
if (fs.existsSync(serverWranglerPath) && geminiKey) {
  try {
    const wranglerConfig = JSON.parse(fs.readFileSync(serverWranglerPath, 'utf8'));
    wranglerConfig.vars = wranglerConfig.vars || {};
    wranglerConfig.vars.GEMINI_API_KEY = geminiKey;
    fs.writeFileSync(serverWranglerPath, JSON.stringify(wranglerConfig, null, 2), 'utf8');
    console.log(`✅ Injected server-side GEMINI_API_KEY into ${serverWranglerPath}`);
  } catch (err) {
    console.error('Error injecting into server wrangler.json:', err);
  }
}
