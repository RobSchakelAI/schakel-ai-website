# Schakel AI - Railway Deployment Guide

This guide walks you through deploying the Schakel AI website to Railway.

## Prerequisites

- GitHub account with the repository: `https://github.com/RobSchakelAI/schakel-ai-website.git`
- Railway account (sign up at https://railway.app)
- MailerSend account with verified domain

## Deployment Steps

### 1. Create New Railway Project

1. Go to https://railway.app
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Connect your GitHub account if not already connected
5. Select the `schakel-ai-website` repository
6. Railway will automatically detect the project and start deployment

### 2. Configure Environment Variables

After the project is created, click on your service and navigate to the **"Variables"** tab. Add the following environment variables:

```
NODE_ENV=production
MAILERSEND_API_KEY=your_mailersend_api_key_here
MAILERSEND_FROM_EMAIL=noreply@schakel.ai
MAILERSEND_TO_EMAIL=info@schakel.ai
```

**Important Notes:**
- `MAILERSEND_API_KEY`: Get this from your MailerSend dashboard → Settings → API Tokens
- `MAILERSEND_FROM_EMAIL`: Must be a verified sender in your MailerSend account
- `MAILERSEND_TO_EMAIL`: The email address where contact form submissions will be sent

### 3. Configure Build Settings

Railway should auto-detect the build settings from `package.json`, but verify:

- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Port**: Railway will automatically assign a port (Express binds to `process.env.PORT || 5000`)

### 4. Domain Configuration

#### Option A: Use Railway's Free Domain
- Railway automatically provides a free `.railway.app` domain
- Find it in the **"Settings"** → **"Domains"** section

#### Option B: Configure Custom Domain (schakel.ai)

1. In Railway, go to **"Settings"** → **"Domains"**
2. Click **"Add Custom Domain"**
3. Enter `schakel.ai` and `www.schakel.ai`
4. Railway will provide DNS records (CNAME or A records)

5. In Namecheap (or your DNS provider):
   - Go to **Domain List** → **Manage** → **Advanced DNS**
   - Add/update the following records:
   
   ```
   Type:  CNAME
   Host:  www
   Value: [railway-provided-domain]
   TTL:   Automatic
   
   Type:  CNAME
   Host:  @
   Value: [railway-provided-domain]
   TTL:   Automatic
   ```

6. Wait for DNS propagation (can take 5-60 minutes)
7. Railway will automatically provision an SSL certificate

## Architecture

The deployed application runs as follows:

```
Railway Container
│
├── Express Server (Port 5000)
│   ├── Static files served from /dist/public
│   ├── API endpoint: POST /api/contact
│   └── Environment variables loaded
│
└── MailerSend Integration
    └── Sends emails via API on form submission
```

**No database required** - this is a static informational site with email-only backend.

## Monitoring & Logs

### View Application Logs
1. Go to your Railway project
2. Click on your service
3. Navigate to the **"Deployments"** tab
4. Click on the latest deployment to view real-time logs

### Common Issues

**Build Fails:**
- Check that all environment variables are set
- Verify Node.js version (should use v20+)
- Review build logs for specific errors

**Email Not Sending:**
- Verify `MAILERSEND_API_KEY` is correct
- Ensure `MAILERSEND_FROM_EMAIL` is verified in MailerSend dashboard
- Check Railway logs for email errors

**404 on Custom Domain:**
- Verify DNS records are correct in Namecheap
- Wait for DNS propagation (use `dig schakel.ai` to check)
- Ensure custom domain is added in Railway settings

## Continuous Deployment

Railway automatically redeploys when you push to the `main` branch on GitHub:

1. Make changes locally
2. Commit and push to GitHub: `git push origin main`
3. Railway detects the push and automatically rebuilds/redeploys
4. Monitor the deployment in the Railway dashboard

## Environment-Specific Behavior

### Development (Replit)
- Uses `npm run dev`
- Hot module reloading enabled
- Vite dev server with Express backend

### Production (Railway)
- Uses `npm run build` → `npm run start`
- Pre-built static files served by Express
- Optimized production bundles
- No HMR or dev tools

## Costs

Railway offers:
- **Free Tier**: $5 credit/month (sufficient for this site)
- **Pro Plan**: $20/month with better limits
- Your site should run comfortably on the free tier

MailerSend costs:
- **Free Tier**: 3,000 emails/month
- Contact form traffic should stay well within this limit

## Rollback

If a deployment breaks:

1. Go to Railway → **"Deployments"**
2. Find a previous working deployment
3. Click **"Redeploy"** on that deployment
4. Or revert the GitHub commit and push

## Support

- **Railway Issues**: https://railway.app/help
- **MailerSend Issues**: https://www.mailersend.com/help
- **DNS Issues**: Namecheap support

## Next Steps After Deployment

1. Test the contact form on the live site
2. Verify emails are received
3. Set up monitoring (Railway provides basic metrics)
4. Configure analytics (Plausible, Simple Analytics, etc.)
5. Add DNS records for email (SPF, DKIM) if using custom domain
6. Consider adding a status page (e.g., status.schakel.ai)

## Local Testing of Production Build

To test the production build locally before deploying:

```bash
npm run build
npm run start
```

Then visit http://localhost:5000

This ensures the build works correctly before pushing to Railway.
