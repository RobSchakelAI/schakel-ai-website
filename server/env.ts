import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

function loadEnvFile(filePath: string): Record<string, string> {
  if (!existsSync(filePath)) {
    return {};
  }
  
  const content = readFileSync(filePath, 'utf-8');
  const env: Record<string, string> = {};
  
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    
    const [key, ...valueParts] = trimmed.split('=');
    if (key && valueParts.length > 0) {
      env[key.trim()] = valueParts.join('=').trim();
    }
  });
  
  return env;
}

export function getEnv(key: string, fallback?: string): string {
  // Priority: process.env > .env.runtime file > fallback
  if (process.env[key] && !process.env[key]?.includes('<jouw')) {
    return process.env[key]!;
  }
  
  // Try loading from .env.runtime file
  const runtimeEnvPath = join(process.cwd(), '.env.runtime');
  const runtimeEnv = loadEnvFile(runtimeEnvPath);
  
  if (runtimeEnv[key]) {
    console.log(`[env] Using ${key} from .env.runtime file`);
    return runtimeEnv[key];
  }
  
  if (fallback) {
    console.log(`[env] Using fallback for ${key}`);
    return fallback;
  }
  
  throw new Error(`Environment variable ${key} is not set`);
}

export function checkEnv() {
  console.log('\n=== Environment Variable Check ===');
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`PORT: ${process.env.PORT}`);
  
  const keys = ['MAILERSEND_API_KEY', 'MAILERSEND_FROM_EMAIL', 'MAILERSEND_TO_EMAIL'];
  keys.forEach(key => {
    const value = process.env[key] || '';
    const isPlaceholder = value.includes('<jouw');
    console.log(`${key}: ${isPlaceholder ? 'PLACEHOLDER DETECTED' : 'set'} (${value.substring(0, 15)}...)`);
  });
  
  console.log('===================================\n');
}
