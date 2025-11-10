# Railway Deployment Setup - Schakel AI Backend

## 🚨 Important: Use Railway CLI for Environment Variables

Railway's web UI has a known bug where it sometimes provides placeholder values instead of actual secrets. **Always use the Railway CLI to set environment variables.**

## Step-by-Step Deployment

### 1. Install Railway CLI

```bash
npm install -g @railway/cli
```

### 2. Login and Link Project

```bash
railway login
railway link
```

Select your `schakel-ai-website` project when prompted.

### 3. Set Environment Variables via CLI

```bash
railway variables set MAILERSEND_API_KEY=mlsn.51a308770deccd139b6329d22792e413fe4a867bfd035ab65b28a06b487f800b
railway variables set MAILERSEND_FROM_EMAIL=rob@schakel.ai
railway variables set MAILERSEND_TO_EMAIL=rob@schakel.ai
```

### 4. Verify Variables

```bash
railway variables
```

You should see:
```
MAILERSEND_API_KEY=mlsn.51a308...
MAILERSEND_FROM_EMAIL=rob@schakel.ai
MAILERSEND_TO_EMAIL=rob@schakel.ai
```

### 5. Deploy

Push to GitHub - Railway will automatically deploy:

```bash
git add -A
git commit -m "Clean Railway deployment setup"
git push origin main
```

### 6. Check Deployment Logs

```bash
railway logs
```

Look for successful startup. There should be NO warnings about placeholder values.

### 7. Test Contact Form

Visit your deployed API:
```
https://schakel-ai-website-production.up.railway.app/healthz
```

Then test the contact form on schakel.ai.

## Troubleshooting

**If you see "placeholder detected" errors:**

1. Delete ALL variables in Railway web UI
2. Use Railway CLI to set them fresh (step 3 above)
3. Redeploy

**If Railway CLI doesn't work:**

Contact Railway support - there may be a project-level configuration issue.

## Environment Variables Required

| Variable | Value |
|----------|-------|
| `MAILERSEND_API_KEY` | Your MailerSend API key (starts with `mlsn.`) |
| `MAILERSEND_FROM_EMAIL` | rob@schakel.ai |
| `MAILERSEND_TO_EMAIL` | rob@schakel.ai |
| `PORT` | *Auto-set by Railway (8080)* |
| `NODE_ENV` | production *(set in Dockerfile)* |
