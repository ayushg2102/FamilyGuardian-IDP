# Deployment Guide for FamilyGuardian-IDP

## Vercel Deployment

This project is configured to deploy on Vercel with both frontend and backend API support.

### Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Backend Server**: Ensure your backend API server is accessible

### Configuration Files

- `vercel.json` - Vercel deployment configuration
- `.env.example` - Environment variables template

### Deployment Steps

#### 1. Environment Setup

Create a `.env.local` file (for local development):
```bash
cp .env.example .env.local
```

#### 2. Deploy to Vercel

**Option A: Using Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production deployment
vercel --prod
```

**Option B: Using Vercel Dashboard**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect the configuration from `vercel.json`

#### 3. Environment Variables on Vercel

In your Vercel project dashboard, add these environment variables:

- `VITE_API_BASE_URL_PROD` = `/api` (for production)
- `VITE_API_BASE_URL` = `http://172.172.233.44:9000/api` (for development)
- `NODE_ENV` = `production`

### How It Works

#### API Proxying
The `vercel.json` configuration sets up API proxying:
- Frontend requests to `/api/*` are proxied to your backend server
- This solves CORS issues and provides a unified domain

#### Environment-Based Configuration
- **Development**: Uses direct backend URL (`http://172.172.233.44:9000/api`)
- **Production**: Uses proxied routes (`/api`)

### Backend Considerations

**Important**: Your current backend server (`http://172.172.233.44:9000`) needs to be:
1. **Publicly accessible** for Vercel to proxy requests
2. **HTTPS enabled** for production (recommended)
3. **CORS configured** to allow requests from your Vercel domain

### Alternative Backend Deployment Options

If you want to deploy your backend on Vercel as well:

1. **Serverless Functions**: Convert your backend to Vercel serverless functions
2. **External Hosting**: Deploy backend on services like Railway, Render, or DigitalOcean
3. **Vercel Edge Functions**: For lightweight API operations

### Troubleshooting

#### Common Issues:

1. **API calls failing in production**:
   - Check if backend server is publicly accessible
   - Verify CORS configuration
   - Check Vercel function logs

2. **Environment variables not working**:
   - Ensure variables are prefixed with `VITE_`
   - Redeploy after adding environment variables

3. **Build failures**:
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`

### Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Function Logs**: Available in Vercel dashboard
- **Real-time Logs**: Use `vercel logs` command

### Support

For issues:
1. Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
2. Vercel community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
