# Vercel Deployment Guide

## Environment Variables to Add in Vercel

Go to your Vercel project settings → Environment Variables and add the same variables from your `.env.local` file.

Required variables:
- `DB_HOST` - Your Aiven MySQL host
- `DB_USER` - Database user
- `DB_PASS` - Database password
- `DB_NAME` - Database name
- `DB_PORT` - Database port (16606)
- `JWT_SECRET` - Secret for JWT tokens
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` - Cloudflare Turnstile site key
- `TURNSTILE_SECRET_KEY` - Cloudflare Turnstile secret key
- `R2_ACCOUNT_ID` - Cloudflare R2 account ID
- `R2_ACCESS_KEY_ID` - R2 access key
- `R2_SECRET_ACCESS_KEY` - R2 secret key
- `R2_BUCKET_NAME` - R2 bucket name
- `R2_PUBLIC_URL` - R2 public URL
- `R2_ENDPOINT` - R2 endpoint URL
- `CALENDLY_API_TOKEN` - Calendly API token

## Important Notes

1. **Database Access**: Your Aiven MySQL database must allow connections from Vercel's IP addresses. Check Aiven dashboard → Network access and ensure it's publicly accessible.

2. **Build Command**: Use default (npm run build)

3. **Output Directory**: Use default (.next)

4. **Node.js Version**: Use Node.js 18.x or later in Vercel settings

## Troubleshooting

If deployment fails:
- Check Vercel build logs for specific errors
- Verify all environment variables are set correctly
- Ensure database allows external connections
