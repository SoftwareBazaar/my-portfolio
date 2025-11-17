# 🎯 Admin Panel - Complete Setup

Your portfolio admin panel is **100% ready**! Follow these simple steps.

---

## ⚡ 3-Step Setup (Takes 3 minutes)

### Step 1: Run SQL Script
1. Open: https://supabase.com/dashboard/project/sqlrlsnzlrggmjjpfxdo/sql/new
2. Copy **ALL** content from `supabase-migration.sql`
3. Paste and click **RUN**
4. ✅ Done! (Creates tables, storage, security)

### Step 2: Create Admin User
1. Open: https://supabase.com/dashboard/project/sqlrlsnzlrggmjjpfxdo/auth/users
2. Click **"Add user"** → **"Create new user"**
3. Enter email & password
4. ✅ Done!

### Step 3: Start Using
```bash
npm run dev
```
Go to: http://localhost:3000/admin/login

---

## 📁 What You Got

### Admin Pages
- `/admin` - Dashboard
- `/admin/projects` - Manage projects
- `/admin/articles` - Manage articles
- `/admin/companies` - Manage companies

### Features
✅ Create, edit, delete content
✅ Upload images (auto-saved to Supabase)
✅ Tag management
✅ Featured content toggle
✅ Secure authentication
✅ Mobile responsive

---

## 📝 Files Created

### Admin Pages (18 files)
```
app/admin/
├── page.tsx                    # Dashboard
├── layout.tsx                  # Admin layout
├── actions.ts                  # Sign out action
├── login/
│   └── page.tsx               # Login page
├── projects/
│   ├── page.tsx               # Projects list
│   ├── actions.ts             # CRUD operations
│   ├── project-form.tsx       # Create/edit form
│   ├── delete-button.tsx      # Delete component
│   ├── new/page.tsx           # New project page
│   └── [id]/edit/page.tsx     # Edit project page
├── articles/
│   ├── page.tsx               # Articles list
│   ├── actions.ts             # CRUD operations
│   ├── article-form.tsx       # Create/edit form
│   ├── delete-button.tsx      # Delete component
│   ├── new/page.tsx           # New article page
│   └── [id]/edit/page.tsx     # Edit article page
└── companies/
    ├── page.tsx               # Companies list
    ├── actions.ts             # CRUD operations
    ├── company-form.tsx       # Create/edit form
    ├── delete-button.tsx      # Delete component
    ├── new/page.tsx           # New company page
    └── [id]/edit/page.tsx     # Edit company page
```

### Setup Files
- `supabase-setup.sql` - Complete database setup
- `QUICK_START.md` - Quick reference guide
- `ADMIN_SETUP.md` - Detailed documentation
- `README_ADMIN.md` - This file

---

## 🗄️ Database Schema

### Projects Table
- id, slug, title, summary, description
- published_at, tech_tags[], featured, status
- thumbnail_url, live_url, github_url

### Articles Table
- id, slug, title, excerpt, content
- published_at, updated_at, tags[], featured
- reading_time, thumbnail_url

### Companies Table
- id, slug, name, tagline, founded
- status, role, content
- logo_url, website

### Storage Buckets
- `project-images` (5MB limit)
- `article-images` (5MB limit)
- `company-logos` (5MB limit)

---

## 🎨 How to Use

### Create Content
1. Click **"+ New Project/Article/Company"**
2. Fill in the form
3. Upload image (optional)
4. Add tags (optional)
5. Click **"Create"**

### Edit Content
1. Click **"Edit"** on any item
2. Make changes
3. Click **"Update"**

### Delete Content
1. Click **"Delete"** on any item
2. Confirm deletion

### Upload Images
- Click "Choose File"
- Select image (JPG, PNG, GIF, WebP)
- Upload happens automatically
- Preview appears below

---

## 🔒 Security

✅ Authentication required for admin access
✅ Row Level Security (RLS) enabled
✅ Public can read, only authenticated can write
✅ Image uploads restricted to authenticated users
✅ Protected routes via middleware

---

## 🐛 Troubleshooting

**SQL script fails?**
- Copy the ENTIRE file
- Make sure you're in SQL Editor
- Safe to run multiple times

**Can't log in?**
- Create user in Supabase Auth first
- Restart dev server after creating user
- Check email/password are correct

**Image upload fails?**
- Verify SQL script ran successfully
- Check storage buckets exist
- Make sure buckets are public

**Database errors?**
- Run SQL script again
- Check `.env.local` credentials
- Verify Supabase project is active

---

## 📚 Documentation

- **Quick Start**: See `QUICK_START.md`
- **Detailed Setup**: See `ADMIN_SETUP.md`
- **SQL Script**: See `supabase-setup.sql`

---

## ✨ Next Steps

1. ✅ Run SQL script
2. ✅ Create admin user
3. ✅ Log in to admin panel
4. ✅ Create your first project/article/company
5. ✅ Upload some images
6. ✅ View content on your public site

---

**Your admin panel is production-ready!** 🚀

Need help? Check the troubleshooting section above or review the detailed docs.
