# 🚀 Quick Start Guide

Get your admin panel running in 3 minutes!

## Step 1: Run SQL Setup (1 minute)

1. Open Supabase SQL Editor:
   ```
   https://supabase.com/dashboard/project/sqlrlsnzlrggmjjpfxdo/sql/new
   ```

2. Copy ALL content from `supabase-migration.sql` (NOT supabase-setup.sql)

3. Paste into SQL Editor and click **RUN**

4. Wait for "Migration completed successfully!" message

✅ This creates:
- Database tables (projects, articles, companies)
- Storage buckets (for images)
- Security policies
- Sample content

## Step 2: Create Admin User (30 seconds)

1. Go to Supabase Authentication:
   ```
   https://supabase.com/dashboard/project/sqlrlsnzlrggmjjpfxdo/auth/users
   ```

2. Click **"Add user"** → **"Create new user"**

3. Enter:
   - Email: `your-email@example.com`
   - Password: `your-secure-password`

4. Click **"Create user"**

## Step 3: Start Using! (1 minute)

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Open admin panel:
   ```
   http://localhost:3000/admin/login
   ```

3. Sign in with the credentials you just created

4. Start managing your content! 🎉

## 📍 Admin Panel URLs

- **Dashboard**: `/admin`
- **Projects**: `/admin/projects`
- **Articles**: `/admin/articles`
- **Companies**: `/admin/companies`

## 🎯 Quick Actions

### Create New Content
- New Project: `/admin/projects/new`
- New Article: `/admin/articles/new`
- New Company: `/admin/companies/new`

### Upload Images
- Click "Choose File" in any form
- Select image (JPG, PNG, GIF, WebP)
- Wait for upload (automatic)
- Preview appears below

### Edit Content
- Click "Edit" button on any item
- Make changes
- Click "Update" to save

### Delete Content
- Click "Delete" button
- Confirm deletion
- Item removed immediately

## 🐛 Troubleshooting

**Can't log in?**
- Make sure you created a user in Supabase Auth
- Check your email/password are correct
- Restart dev server: `npm run dev`

**SQL script fails?**
- Make sure you copied the ENTIRE file
- Check for any error messages
- Try running it again (it's safe to re-run)

**Image upload fails?**
- Verify SQL script ran successfully
- Check storage buckets exist in Supabase
- Make sure buckets are public

**Database errors?**
- Run the SQL script again
- Check Supabase project is active
- Verify `.env.local` has correct credentials

## 📚 Need More Help?

See `ADMIN_SETUP.md` for detailed documentation.

---

**That's it! You're ready to manage your portfolio content.** 🚀
