# Deployment Guide: Vercel + Railway

This guide explains how to deploy Schakel AI with the frontend on Vercel and the backend API on Railway.

## Architecture

- **Frontend (Vercel)**: Static React app with CDN distribution
- **Backend (Railway)**: Express.js API server for contact form emails
- **Communication**: Frontend calls Railway API via VITE_API_URL

## Step 1: Push to GitHub

1. **Initialize Git (if not already done)**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit with contact form"
   ```

2. **Connect to GitHub**:
   ```bash
   git remote add origin https://github.com/RobSchakelAI/schakel-ai-website.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy Backend to Railway

1. Go to [railway.app](https://railway.app) and sign in
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select `RobSchakelAI/schakel-ai-website`
4. Railway will auto-detect Node.js

### Configure Railway Environment Variables

Go to your project → **Variables** tab and add:

```
NODE_ENV=production
MAILERSEND_API_KEY=<your-key>
MAILERSEND_FROM_EMAIL=noreply@schakel.ai
MAILERSEND_TO_EMAIL=info@schakel.ai
```

### Railway Settings

- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- Railway will automatically use port from `PORT` env variable

### Get Your Railway URL

After deployment, Railway will provide a URL like:
```
https://schakel-ai-website-production.up.railway.app
```

**Important**: Copy this URL - you'll need it for Vercel!

## Step 3: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import `RobSchakelAI/schakel-ai-website` from GitHub
4. Configure project settings:

### Vercel Build Settings

- **Framework Preset**: Vite
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist/public` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Vercel Environment Variables

Add this environment variable:

```
VITE_API_URL=https://your-railway-app.up.railway.app
```

Replace `your-railway-app.up.railway.app` with your actual Railway URL from Step 2.

### Deploy

Click **"Deploy"** and Vercel will build and deploy your frontend.

## Step 4: Configure Custom Domain (Optional)

### For Vercel (schakel.ai)

1. In Vercel project → **Settings** → **Domains**
2. Add `schakel.ai` and `www.schakel.ai`
3. Update DNS records at Namecheap:
   ```
   Type: CNAME
   Host: www
   Value: cname.vercel-dns.com
   
   Type: A
   Host: @
   Value: 76.76.21.21
   ```

### For Railway (Optional subdomain for API)

If you want a custom domain for the API:
1. Railway project → **Settings** → **Domains**
2. Add `api.schakel.ai`
3. Update DNS at Namecheap:
   ```
   Type: CNAME
   Host: api
   Value: <your-railway-domain>
   ```
4. Update Vercel's `VITE_API_URL` to `https://api.schakel.ai`

## Step 5: Test the Deployment

1. Visit your Vercel URL (e.g., `schakel.ai`)
2. Fill out the contact form
3. Check if the email arrives at `info@schakel.ai`
4. Verify in Railway logs that the API received the request

## Troubleshooting

### Contact form not working

1. Check Vercel build logs for errors
2. Check Railway logs: `railway logs`
3. Verify `VITE_API_URL` is set correctly in Vercel
4. Check browser console for CORS errors

### CORS Issues

If you see CORS errors, you may need to add CORS middleware to `server/index.ts`:

```typescript
import cors from 'cors';

app.use(cors({
  origin: 'https://schakel.ai',
  credentials: true
}));
```

## Environment Variables Summary

### Railway (Backend)
```
NODE_ENV=production
MAILERSEND_API_KEY=<key>
MAILERSEND_FROM_EMAIL=noreply@schakel.ai
MAILERSEND_TO_EMAIL=info@schakel.ai
```

### Vercel (Frontend)
```
VITE_API_URL=https://your-railway-app.up.railway.app
```

## Continuous Deployment

Both platforms support automatic deployment:
- **Push to `main`** → Railway redeploys backend automatically
- **Push to `main`** → Vercel redeploys frontend automatically

## Monitoring

- **Railway**: Built-in logs and metrics
- **Vercel**: Analytics and Web Vitals
- **MailerSend**: Email delivery logs and analytics

## Costs

- **Vercel**: Free tier (Hobby) suitable for this project
- **Railway**: $5/month starter plan recommended
- **MailerSend**: Free tier includes 3,000 emails/month
