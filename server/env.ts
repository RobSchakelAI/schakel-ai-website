export function getEnv(key: string, fallback?: string): string {
  const value = process.env[key];
  
  // Check for Railway placeholder bug
  if (value && value.includes('<jouw')) {
    console.error(`❌ Railway placeholder detected for ${key}: "${value}"`);
    console.error(`Fix: Use Railway CLI to set the variable:`);
    console.error(`  railway variables set ${key}=<your-actual-value>`);
    throw new Error(`${key} contains placeholder value - use Railway CLI to set it`);
  }
  
  if (value) {
    return value;
  }
  
  if (fallback) {
    console.warn(`⚠️  Using fallback for ${key}`);
    return fallback;
  }
  
  throw new Error(`Environment variable ${key} is not set`);
}
