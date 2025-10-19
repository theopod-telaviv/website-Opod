# Deployment Guide - The O Pod Hotel Website

## Pre-Deployment Checklist

Before deploying to production, ensure:

- [x] Project builds successfully (`npm run build`)
- [ ] All tests pass (if implemented)
- [ ] Type checking passes (`npm run typecheck`)
- [ ] QA checklist completed
- [ ] Environment variables documented
- [ ] Domain name registered and configured
- [ ] SSL certificate ready (usually auto via platform)
- [ ] Analytics tracking IDs obtained
- [ ] SimpleBooking integration tested

## Environment Variables

Create the following environment variables in your deployment platform:

### Required

```env
# SimpleBooking Integration
SIMPLEBOOKING_BASE_URL=https://www.simplebooking.it/ibe2/hotel/9240
DEFAULT_CURRENCY=ILS

# Analytics (Optional but recommended)
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### Optional

```env
# Mapbox for interactive maps (if implementing map features)
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the creators of Next.js and offers the best integration.

#### Steps:

1. **Connect Repository**
   ```bash
   # Push your code to GitHub/GitLab/Bitbucket
   git push origin main
   ```

2. **Import Project on Vercel**
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your Git repository
   - Vercel auto-detects Next.js

3. **Configure Environment Variables**
   - In project settings → Environment Variables
   - Add all required variables
   - Set for Production, Preview, and Development

4. **Configure Domain**
   - Project Settings → Domains
   - Add your custom domain: `theopodhotel.com`
   - Follow DNS configuration instructions
   - Vercel auto-provisions SSL

5. **Deploy**
   - Click "Deploy"
   - Vercel builds and deploys automatically
   - Every push to main triggers new deployment

#### Vercel Configuration

Create `vercel.json` (optional, for custom configuration):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

#### Benefits:
- Zero configuration
- Automatic HTTPS
- Global CDN
- Preview deployments
- GitHub integration
- Automatic optimizations

### Option 2: Netlify

#### Steps:

1. **Connect Repository**
   - Go to https://netlify.com
   - Click "Add new site"
   - Import from Git

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

3. **Add Environment Variables**
   - Site settings → Environment variables
   - Add all required variables

4. **Configure Domain**
   - Domain settings → Add custom domain
   - Follow DNS instructions

5. **Deploy**

#### Netlify Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Option 3: Self-Hosted (VPS/Cloud)

#### Requirements:
- Node.js 18+ installed
- Nginx or Apache
- PM2 for process management
- SSL certificate (Let's Encrypt)

#### Steps:

1. **Clone Repository**
   ```bash
   git clone <your-repo-url>
   cd the-o-pod-hotel
   ```

2. **Install Dependencies**
   ```bash
   npm ci --production
   ```

3. **Create Environment File**
   ```bash
   nano .env.local
   # Add all environment variables
   ```

4. **Build Application**
   ```bash
   npm run build
   ```

5. **Start with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "o-pod-hotel" -- start
   pm2 save
   pm2 startup
   ```

6. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name theopodhotel.com www.theopodhotel.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **SSL with Certbot**
   ```bash
   sudo certbot --nginx -d theopodhotel.com -d www.theopodhotel.com
   ```

## DNS Configuration

### Example DNS Records

```
Type    Name    Value                       TTL
A       @       76.76.21.21                3600
A       www     76.76.21.21                3600
CNAME   www     theopodhotel.com           3600
```

For Vercel:
```
Type    Name    Value                       TTL
A       @       76.76.21.21                3600
CNAME   www     cname.vercel-dns.com       3600
```

## Post-Deployment Tasks

### 1. Verify Deployment
- [ ] Visit https://theopodhotel.com
- [ ] Test all locales (/he, /en, /fr)
- [ ] Test booking widget
- [ ] Verify all links work
- [ ] Check images load
- [ ] Test on mobile device

### 2. SEO Setup
- [ ] Submit sitemap to Google Search Console
  - URL: `https://theopodhotel.com/sitemap.xml`
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify domain ownership
- [ ] Request indexing for homepage

### 3. Analytics Setup
- [ ] Verify GA4 tracking
  - Visit site with GA Debugger extension
  - Check Real-Time reports
- [ ] Set up conversion tracking
  - Goal: Booking button clicks
- [ ] Configure GTM (if used)

### 4. Performance Testing
- [ ] Run Lighthouse audit
  - Target: 90+ on all metrics
- [ ] Test on PageSpeed Insights
- [ ] Check Core Web Vitals
- [ ] Test loading speed from different locations

### 5. Security
- [ ] Verify HTTPS works
- [ ] Check security headers
  - Test at securityheaders.com
- [ ] Ensure no sensitive data exposed
- [ ] Test XSS protection

### 6. Monitoring Setup
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Configure error tracking (Sentry, optional)
- [ ] Set up performance monitoring
- [ ] Create alerts for downtime

## Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm ci

    - name: Run type check
      run: npm run typecheck

    - name: Build
      run: npm run build
      env:
        SIMPLEBOOKING_BASE_URL: ${{ secrets.SIMPLEBOOKING_BASE_URL }}
        DEFAULT_CURRENCY: ${{ secrets.DEFAULT_CURRENCY }}

    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Rollback Procedure

### Vercel
1. Go to Deployments
2. Find previous successful deployment
3. Click "..." → "Promote to Production"

### Netlify
1. Go to Deploys
2. Find previous deploy
3. Click "Publish deploy"

### Self-Hosted
```bash
git log --oneline  # Find previous commit
git reset --hard <commit-hash>
npm run build
pm2 restart o-pod-hotel
```

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working
- Verify they're set in platform
- Check they're prefixed with `NEXT_PUBLIC_` for client-side
- Restart deployment after adding variables

### Images Not Loading
- Check Next.js image configuration
- Verify remote patterns in `next.config.js`
- Ensure images exist in `/public`

### 404 Errors
- Check file names match URLs
- Verify `[locale]` routing is correct
- Check middleware configuration

### Slow Loading
- Run Lighthouse audit
- Check image sizes
- Verify CDN is working
- Check for render-blocking resources

## Maintenance Windows

Plan regular maintenance:
- **Weekly**: Check error logs, review analytics
- **Monthly**: Update dependencies, review performance
- **Quarterly**: Content audit, SEO review, security audit

## Support Contacts

- **Hosting Issues**: Vercel/Netlify support
- **DNS Issues**: Domain registrar support
- **SimpleBooking**: Contact SimpleBooking support
- **Development**: dev@theopodhotel.com

## Backup Strategy

### Vercel/Netlify
- Automatic backups via Git
- Every deployment is saved
- Can rollback to any version

### Self-Hosted
```bash
# Automated daily backup script
#!/bin/bash
tar -czf backup-$(date +%Y%m%d).tar.gz .
scp backup-$(date +%Y%m%d).tar.gz user@backup-server:/backups/
```

## Success Metrics

Monitor these KPIs post-launch:
- **Uptime**: > 99.9%
- **Page Load Time**: < 3s (mobile)
- **Bounce Rate**: < 60%
- **Booking Click-Through**: Track increase
- **SEO Rankings**: Monitor keyword positions
- **Core Web Vitals**: All green

---

## Quick Deploy Commands

```bash
# Development
npm run dev

# Type check
npm run typecheck

# Build
npm run build

# Production server
npm run start
```

## Emergency Contacts

- **Technical Lead**: [Your Name]
- **Project Manager**: [Name]
- **Hosting Support**: support@vercel.com
- **DNS Provider**: [Provider Support]

---

**Last Updated**: 2025-10-03
