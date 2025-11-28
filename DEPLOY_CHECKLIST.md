# 🚀 Quick Deployment Checklist

Follow these steps in order for a smooth deployment:

## ☑️ Pre-Deployment

- [ ] Code is committed to GitHub
- [ ] All tests pass locally
- [ ] Environment variables are documented

## 🔧 Backend Deployment (Render)

1. - [ ] Sign up at https://render.com
2. - [ ] Create new Blueprint from GitHub repo
3. - [ ] Wait for initial deployment
4. - [ ] Copy backend URL (e.g., `https://carenest-backend.onrender.com`)
5. - [ ] Test health endpoint: `curl https://your-backend-url.onrender.com/api/health`

## 🎨 Frontend Deployment (Vercel or Netlify)

### Vercel
1. - [ ] Sign up at https://vercel.com
2. - [ ] Import GitHub repository
3. - [ ] Add environment variable: `VITE_API_URL` = your backend URL
4. - [ ] Deploy
5. - [ ] Copy frontend URL (e.g., `https://carenest.vercel.app`)

### OR Netlify
1. - [ ] Sign up at https://netlify.com
2. - [ ] Import GitHub repository
3. - [ ] Add environment variable: `VITE_API_URL` = your backend URL
4. - [ ] Deploy
5. - [ ] Copy frontend URL (e.g., `https://carenest.netlify.app`)

## 🔄 Post-Deployment Configuration

1. - [ ] Update `CORS_ORIGIN` on Render with your frontend URL
2. - [ ] Wait for Render to redeploy (automatic)
3. - [ ] Test login/signup on frontend
4. - [ ] Check browser console for errors
5. - [ ] Test all major features

## ✅ Verification

- [ ] Frontend loads without errors
- [ ] Can create new account
- [ ] Can log in
- [ ] API calls work correctly
- [ ] No CORS errors in console

## 📝 URLs to Save

```
Backend URL: ________________________________
Frontend URL: ________________________________
Render Dashboard: https://render.com/dashboard
Vercel/Netlify Dashboard: ________________________________
```

## 🆘 If Something Goes Wrong

1. Check Render logs: Dashboard → Service → Logs
2. Check browser console for frontend errors
3. Verify environment variables are set correctly
4. Ensure CORS_ORIGIN matches frontend URL exactly
5. Wait 60 seconds if backend shows 503 (it's spinning up)

## 🎉 You're Done!

Share your live URLs:
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-api.onrender.com`
