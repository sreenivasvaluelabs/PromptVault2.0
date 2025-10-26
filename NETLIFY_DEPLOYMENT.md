# Netlify Deployment Guide for PromptVault 2.0

## 🚀 Deployment Strategy: Netlify Functions + Static Site

Since PromptVault 2.0 is a full-stack application, we'll use Netlify Functions for the backend API and static site hosting for the frontend.

## 📋 Pre-Deployment Checklist

### Required Environment Variables on Netlify:
```
NODE_ENV=production
DATABASE_URL=your-postgresql-connection-string
SESSION_SECRET=your-super-secret-session-key
ALLOWED_ORIGINS=https://your-netlify-site.netlify.app
```

### Required Files for Netlify:
1. `netlify.toml` - Configuration file
2. `_redirects` - Client-side routing
3. Modified build scripts
4. Netlify Functions in `/netlify/functions/`

## 🛠️ Setup Steps

### Step 1: Create Netlify Configuration

Create `netlify.toml` in project root:

```toml
[build]
  publish = "dist"
  command = "npm run build:netlify"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[functions]
  directory = "netlify/functions"
```

### Step 2: Update Package.json Scripts

Add these scripts to your package.json:

```json
{
  "scripts": {
    "build:netlify": "vite build && npm run build:functions",
    "build:functions": "esbuild netlify/functions/api.ts --platform=node --packages=external --bundle --format=cjs --outdir=netlify/functions --out-extension:.js=.js"
  }
}
```

### Step 3: Database Options

#### Option A: Neon Database (Recommended)
- **Free tier available**
- **Serverless PostgreSQL**
- **Perfect for Netlify Functions**

#### Option B: Supabase
- **Free tier with auth**
- **Built-in APIs**
- **Good PostgreSQL hosting**

#### Option C: Railway/PlanetScale
- **Railway**: Great for PostgreSQL
- **PlanetScale**: MySQL alternative

## 🔧 Required Code Changes

### 1. Create Netlify Function Handler

Create: `/netlify/functions/api.ts`

```typescript
import { Handler } from '@netlify/functions';
import express from 'express';
import serverless from 'serverless-http';
import { registerRoutes } from '../../server/routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

registerRoutes(app);

const handler = serverless(app);

export const handler: Handler = async (event, context) => {
  return await handler(event, context);
};
```

### 2. Update Vite Config for Static Build

Modify `vite.config.ts`:

```typescript
export default defineConfig({
  // ... existing config
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'client/index.html'),
      },
    },
  },
});
```

### 3. Environment Variables Setup

In your Netlify dashboard:
1. Go to Site Settings → Environment Variables
2. Add all required variables from `.env.example`

## 📦 Deployment Commands

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy (from project root)
netlify deploy

# Deploy to production
netlify deploy --prod
```

## 🎯 Alternative: Split Architecture

### Frontend-Only on Netlify + Separate Backend

If you prefer to keep the current architecture:

1. **Deploy Frontend to Netlify**:
   - Build only the React app
   - Update API calls to point to separate backend

2. **Deploy Backend Separately**:
   - **Railway**: Easy Express.js deployment
   - **Render**: Free tier with PostgreSQL
   - **Heroku**: Classic choice (paid)
   - **DigitalOcean App Platform**: Good performance

## 💡 Simplest Approach: Static Data

For the **simplest Netlify deployment**, convert to static data:

1. **Remove backend dependency**
2. **Use local JSON files** for prompt data
3. **Deploy as pure static site**
4. **Add search with client-side filtering**

This would require minimal changes and work perfectly on Netlify's free tier.

## 🔍 Recommendation

**For simplest deployment**: 
- Use **static data approach** (no backend needed)
- **Free Netlify hosting**
- **No database required**
- **Instant global CDN**

**For full functionality**:
- **Netlify Functions** + **Neon Database**
- **Serverless architecture**
- **Automatic scaling**
- **Cost-effective**