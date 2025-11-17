# 🚀 Vercel Deployment Guide

Complete guide to deploy your portfolio to Vercel.

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:
- ✅ Supabase database is set up (tables, storage buckets)
- ✅ Admin user created in Supabase Auth
- ✅ Hero section configured
- ✅ Projects added via admin panel
- ✅ Environment variables ready

---

## 📋 Step 1: Prepare Environment Variables

You'll need these environment variables for Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=https://sqlrlsnzlrggmjjpfxdo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxbHJsc256bHJnZ21qanBmeGRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4Nzg1NDcsImV4cCI6MjA3ODQ1NDU0N30.z4RTnpIUDtoTWdICDF2NOesgru21T9yILHUQ4rRu6dA
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxbHJsc256bHJnZ21qanBmeGRvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mjg3ODU0NywiZXhwIjoyMDc4NDU0NTQ3fQ.AYb1CyXYlvrUYRK-WYMjXQpr1xtg8A4osqrxH6L4VGE
NEXTAUTH_SECRET=7z4cboJapqctoADZGO-blnAj6ouRp3WFBcfJDJGJy7U
```

---

## 🚀 Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**: https://vercel.com/new

2. **Import Git Repository**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add each variable from Step 1:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `NEXTAUTH_SECRET`
   - Make sure to add them for **Production**, **Preview**, and **Development**

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? portfolio (or your choice)
# - Directory? ./
# - Override settings? No

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add NEXTAUTH_SECRET

# Deploy to production
vercel --prod
```

---

## 🔧 Step 3: Post-Deployment Configuration

### 1. Update Supabase Site URL
1. Go to: https://supabase.com/dashboard/project/sqlrlsnzlrggmjjpfxdo/auth/url-configuration
2. Add your Vercel URL to **Site URL**: `https://your-project.vercel.app`
3. Add to **Redirect URLs**:
   - `https://your-project.vercel.app/admin`
   - `https://your-project.vercel.app/admin/login`

### 2. Test Admin Login
1. Go to: `https://your-project.vercel.app/admin/login`
2. Sign in with your Supabase credentials
3. Verify you can access the admin panel

### 3. Add Custom Domain (Optional)
1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update Supabase Site URL to your custom domain

---

## 📝 Step 4: Verify Deployment

Check these pages work correctly:
- ✅ Homepage: `https://your-project.vercel.app`
- ✅ Projects: `https://your-project.vercel.app/projects`
- ✅ Articles: `https://your-project.vercel.app/articles`
- ✅ Companies: `https://your-project.vercel.app/companies`
- ✅ Admin Login: `https://your-project.vercel.app/admin/login`
- ✅ Admin Dashboard: `https://your-project.vercel.app/admin`

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to your Git repository:

1. **Push to main branch** → Deploys to production
2. **Push to other branches** → Creates preview deployment
3. **Pull requests** → Automatic preview deployments

```bash
# Make changes
git add .
git commit -m "Update content"
git push origin main

# Vercel automatically deploys!
```

---

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Run `npm run build` locally to test

### Admin Login Doesn't Work
- Verify Supabase Site URL includes your Vercel domain
- Check environment variables are correct
- Clear browser cache and try again

### Images Don't Load
- Verify Supabase storage buckets are public
- Check image URLs in admin panel
- Ensure storage policies are set correctly

### Database Connection Issues
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check `SUPABASE_SERVICE_ROLE_KEY` is set
- Test connection in Supabase dashboard

---

## 🎉 Success!

Your portfolio is now live on Vercel! 

**Next Steps:**
1. Add your projects via `/admin/projects`
2. Upload project images
3. Write articles via `/admin/articles`
4. Update hero section via `/admin/hero`
5. Share your portfolio URL!

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase with Vercel](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

**Your portfolio is production-ready!** 🚀
