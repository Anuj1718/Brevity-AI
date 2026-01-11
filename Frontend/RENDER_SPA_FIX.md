# Render Static Site Configuration for SPA Routing

## The Problem
Render static sites serve files directly. When you refresh on `/pricing`, Render looks for a file called `pricing` and returns 404.

## The Solution - Multiple Approaches

### ✅ Method 1: Configure in Render Dashboard (RECOMMENDED)

1. Go to your Render Dashboard: https://dashboard.render.com
2. Select your static site service (`brevity-frontend.onrender.com`)
3. Go to **Settings**
4. Scroll to **Redirects/Rewrites** section
5. Add this rewrite rule:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Type**: `Rewrite`
6. Click **Save Changes**
7. Your site will automatically redeploy

### ✅ Method 2: Use 404.html Fallback (Already Implemented)

I've created a `public/404.html` file that automatically redirects to index.html while preserving the URL. This works on Render automatically.

**Files created:**
- `public/404.html` - Catches 404 errors and redirects to index.html
- Updated `src/main.jsx` - Restores the correct route after redirect

### ✅ Method 3: Use _redirects file (Netlify-style, works on some platforms)

Already exists in `public/_redirects`

## After Fixing

Once configured, test these URLs by refreshing:
- https://brevity-frontend.onrender.com/pricing
- https://brevity-frontend.onrender.com/upload
- https://brevity-frontend.onrender.com/services
- https://brevity-frontend.onrender.com/help

All should work without "Not Found" errors.

## Important Note

For Render, **Method 1 (Dashboard Configuration)** is the most reliable. The 404.html fallback (Method 2) should also work but may cause a brief flash during redirect.

If you're still seeing "Not Found" after deploying these changes, you MUST configure the rewrite rule in the Render Dashboard (Method 1).
