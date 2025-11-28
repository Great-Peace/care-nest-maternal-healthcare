# 🚀 CareNest - Quick Start (5 Minutes)

## For Your Hackathon Presentation Tomorrow

### Step 1: Navigate to Project (30 seconds)
```bash
cd carenest
```

### Step 2: Run Setup Script (2 minutes)
```bash
./setup.sh
```

This will:
- ✅ Install all dependencies
- ✅ Create environment files
- ✅ Set up both frontend and backend

### Step 3: Start Development Server (30 seconds)
```bash
npm run dev
```

Wait for:
```
🚀 CareNest API is running on port 5000
VITE ready in XXX ms
```

### Step 4: Open Application (10 seconds)
Open your browser to: **http://localhost:5173**

### Step 5: Test Registration Flow (1-2 minutes)
1. Select language (English)
2. Click "Log in / Sign up"
3. Fill in the 4 steps:
   - Personal Info
   - Pregnancy Info (enter LMP to see auto-calculations)
   - Medical History
   - Emergency Contact
4. Complete registration
5. View dashboard

---

## ✅ You're Ready!

Your app is now running and you can demo:
- ✨ Multi-language selection
- ✨ 4-step registration with progress bar
- ✨ Automatic pregnancy calculations
- ✨ Beautiful dashboard with progress tracking
- ✨ Quick action buttons
- ✨ Health tips
- ✨ Bottom navigation

---

## 🎤 For Your Presentation

### Before You Present:
1. ✅ Test the full registration flow
2. ✅ Have the app running (`npm run dev`)
3. ✅ Open browser to localhost:5173
4. ✅ Review [HACKATHON_PRESENTATION.md](HACKATHON_PRESENTATION.md)

### During Presentation:
1. Show welcome screen → explain multi-language
2. Go through registration → highlight auto-calculations
3. Show dashboard → pregnancy progress, quick actions
4. Explain architecture → full-stack TypeScript
5. Discuss impact → maternal healthcare in Rwanda

### Key Talking Points:
- **Problem:** Limited maternal healthcare access in Rwanda
- **Solution:** Mobile-first, multilingual, comprehensive care tracking
- **Tech:** React + TypeScript + Express, fully type-safe
- **Impact:** Empowering mothers with accessible care information

---

## 📚 Full Documentation

- [README.md](README.md) - Project overview
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed setup
- [HACKATHON_PRESENTATION.md](HACKATHON_PRESENTATION.md) - Presentation guide
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - What was built

---

## 🆘 Emergency Troubleshooting

### App won't start?
```bash
rm -rf node_modules packages/*/node_modules
./setup.sh
```

### Port already in use?
```bash
# Kill processes on ports 5000 and 5173
lsof -ti:5000 | xargs kill -9
lsof -ti:5173 | xargs kill -9
```

### Environment files missing?
```bash
cp packages/backend/.env.example packages/backend/.env
cp packages/frontend/.env.example packages/frontend/.env
```

---

## 🎯 Demo Checklist

- [ ] App running on localhost:5173
- [ ] Backend API running on localhost:5000
- [ ] Registration flow tested
- [ ] Dashboard loads correctly
- [ ] Presentation slides/notes ready
- [ ] Backup plan (screenshots if demo fails)

---

## 💡 Pro Tips

1. **Have a backup user ready** - Register before presenting
2. **Screenshot key screens** - In case of technical issues
3. **Time your demo** - Keep it under 5 minutes
4. **Practice the flow** - Do a dry run
5. **Know your numbers** - Lines of code, features, etc.

---

## 📞 Quick Commands

```bash
# Start everything
npm run dev

# Backend only
npm run dev:backend

# Frontend only
npm run dev:frontend

# Reinstall everything
./setup.sh

# Build for production
npm run build
```

---

## 🎉 Good Luck!

You have a **complete, professional, production-ready** application.

**Believe in your work—you've built something amazing!** 🚀

---

**Questions? Check the detailed guides above or review the code.**
