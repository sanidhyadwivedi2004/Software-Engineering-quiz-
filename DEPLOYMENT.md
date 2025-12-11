# Quick Deployment Guide  

## Deploy to Vercel in 3 Steps

### Step 1: Prepare Your Project

Make sure all files are in your project directory: 
- ✅ index.html 
- ✅ styles.css 
- ✅ script.js  
- ✅ questions.js
- ✅ vercel.json
- ✅ 1.svg

### Step 2: Deploy

**Option A: Using Vercel Website (Easiest)**

1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click "Add New..." → "Project"
4. Import your Git repository OR drag & drop your project folder
5. Click "Deploy"
6. Done! Your quiz is live 🎉

**Option B: Using Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Step 3: Enable Analytics

Analytics is already configured! After deployment:

1. Go to your project on Vercel dashboard
2. Click on "Analytics" tab
3. Data will start appearing automatically

## What Gets Tracked?

Your quiz automatically tracks:

- 📊 **Page Views** - How many people visit
- 👥 **Unique Visitors** - Individual users
- 🎯 **Quiz Starts** - When students begin
- ✅ **Question Answers** - Each answer with correctness
- 🏆 **Quiz Completions** - Final scores and time
- 🎨 **Theme Changes** - Dark/light mode usage
- 📈 **Leaderboard Views** - Engagement metrics
- 🎖️ **Badge Downloads** - Achievement tracking

## View Your Analytics

After deployment, visit:
```
https://vercel.com/[your-username]/[project-name]/analytics
```

## Custom Domain (Optional)

1. Go to your project settings on Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Environment Variables (If Needed)

If you want to add any API keys or secrets:

1. Go to project settings
2. Click "Environment Variables"
3. Add your variables
4. Redeploy

## Troubleshooting

**Analytics not showing?**
- Wait 24 hours for data to appear
- Make sure you're on a paid Vercel plan for full analytics
- Check browser console for errors

**Quiz not loading?**
- Check all files are uploaded
- Verify vercel.json is in root directory
- Check browser console for errors

**Dark mode not working?**
- Clear browser cache
- Check if JavaScript is enabled

## Update Your Quiz

To update questions or features:

1. Make changes to your files
2. Push to Git (if using Git integration)
   OR
3. Run `vercel --prod` again

Vercel will automatically redeploy!

## Performance Tips

- ✅ Already optimized: Static files load instantly
- ✅ Already configured: Vercel Edge Network (CDN)
- ✅ Already enabled: Compression and caching
- ✅ Already added: Security headers

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Project Issues: Open an issue on GitHub

---

Happy Deploying! 🚀







