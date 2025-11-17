# Admin Panel Setup Guide

Your admin panel is now complete! Here's what you need to do to get it fully operational.

## ✅ What's Been Built

### Admin Pages Created:
- `/admin` - Dashboard with content statistics
- `/admin/projects` - List, create, edit, and delete projects
- `/admin/articles` - List, create, edit, and delete articles  
- `/admin/companies` - List, create, edit, and delete companies

### Features Included:
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Image upload functionality
- ✅ Form validation
- ✅ Tag management
- ✅ Featured content toggle
- ✅ Authentication & protected routes

## 🔧 Quick Setup (2 Steps!)

### 1. Run SQL Script in Supabase

**This will automatically create everything you need:**
- ✅ Database tables (projects, articles, companies)
- ✅ Storage buckets (project-images, article-images, company-logos)
- ✅ Security policies (RLS)
- ✅ Sample data to get started

**Steps:**
1. Go to your Supabase SQL Editor: https://supabase.com/dashboard/project/sqlrlsnzlrggmjjpfxdo/sql/new
2. Copy the entire contents of `supabase-setup.sql` file
3. Paste it into the SQL Editor
4. Click "Run" or press Ctrl+Enter
5. Wait for "Success" message

That's it! Everything is now set up automatically.

### 2. Create Admin User

In your Supabase dashboard:
1. Go to Authentication → Users: https://supabase.com/dashboard/project/sqlrlsnzlrggmjjpfxdo/auth/users
2. Click "Add user" → "Create new user"
3. Enter your email and password
4. Click "Create user"
5. Use these credentials to log into `/admin/login`

## 📋 What the SQL Script Creates

### Database Tables:

**projects table:**
- id (uuid, primary key)
- slug (text, unique)
- title (text)
- summary (text)
- description (text)
- published_at (timestamp)
- tech_tags (text[])
- featured (boolean)
- status (text)
- thumbnail_url (text, nullable)
- live_url (text, nullable)
- github_url (text, nullable)

**articles table:**
- id (uuid, primary key)
- slug (text, unique)
- title (text)
- excerpt (text)
- content (text)
- published_at (timestamp)
- updated_at (timestamp, nullable)
- tags (text[])
- featured (boolean)
- reading_time (integer)
- thumbnail_url (text, nullable)

**companies table:**
- id (uuid, primary key)
- slug (text, unique)
- name (text)
- tagline (text)
- founded (text)
- status (text)
- role (text)
- content (text)
- logo_url (text, nullable)
- website (text, nullable)

### 3. Create Admin User

In your Supabase dashboard:
1. Go to Authentication → Users
2. Click "Add user"
3. Enter email and password
4. Use these credentials to log into `/admin/login`

## 🚀 How to Use

### Start Development Server
```bash
npm run dev
```

### Access Admin Panel
1. Navigate to: http://localhost:3000/admin/login
2. Sign in with your Supabase user credentials
3. You'll be redirected to the admin dashboard

### Managing Content

**Projects:**
- View all: `/admin/projects`
- Create new: `/admin/projects/new`
- Edit: Click "Edit" button on any project
- Delete: Click "Delete" button (with confirmation)

**Articles:**
- View all: `/admin/articles`
- Create new: `/admin/articles/new`
- Edit: Click "Edit" button on any article
- Delete: Click "Delete" button (with confirmation)

**Companies:**
- View all: `/admin/companies`
- Create new: `/admin/companies/new`
- Edit: Click "Edit" button on any company
- Delete: Click "Delete" button (with confirmation)

### Image Uploads

When creating/editing content:
1. Click "Choose File" in the image upload field
2. Select an image from your computer
3. Wait for upload to complete
4. Preview will appear below the upload button
5. Image URL is automatically saved with the content

## 🎨 Customization

### Change Primary Color
Edit `tailwind.config.ts` to change the primary color used throughout the admin panel.

### Add More Fields
To add custom fields to any content type:
1. Add column to Supabase table
2. Update the form in `*-form.tsx`
3. Update the actions in `actions.ts`

## 🔒 Security Notes

- Admin routes are protected by middleware
- Only authenticated users can access `/admin/*`
- Service role key is used server-side only
- Image uploads are validated on the server

## 📝 Next Steps

1. Create the storage buckets in Supabase
2. Create an admin user account
3. Log in and start adding content!
4. Your content will automatically appear on the public-facing pages

## 🐛 Troubleshooting

**Can't log in?**
- Verify your Supabase credentials in `.env.local`
- Make sure you created a user in Supabase Auth
- Restart your dev server after changing `.env.local`

**Image upload fails?**
- Check that storage buckets exist and are public
- Verify bucket names match exactly: `project-images`, `article-images`, `company-logos`

**Database errors?**
- Verify table structure matches the schema above
- Check that all required columns exist
- Ensure UUID extension is enabled in Supabase

---

Your admin panel is ready to use! 🎉
