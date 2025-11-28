# CareNest Setup Guide

## Quick Start

### Automated Setup (Recommended)

```bash
cd carenest
./setup.sh
```

This script will:
- Install all dependencies
- Create environment files
- Set up both frontend and backend

### Manual Setup

If you prefer manual setup:

1. **Install root dependencies:**
```bash
npm install
```

2. **Setup backend:**
```bash
cd packages/backend
cp .env.example .env
npm install
cd ../..
```

3. **Setup frontend:**
```bash
cd packages/frontend
cp .env.example .env
npm install
cd ../..
```

## Configuration

### Backend Environment Variables

Edit `packages/backend/.env`:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CORS_ORIGIN=http://localhost:5173
```

**Important:** Change `JWT_SECRET` to a secure random string in production!

### Frontend Environment Variables

Edit `packages/frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

### Run Everything (Frontend + Backend)

```bash
npm run dev
```

This starts:
- Backend API on http://localhost:5000
- Frontend app on http://localhost:5173

### Run Individually

**Backend only:**
```bash
npm run dev:backend
```

**Frontend only:**
```bash
npm run dev:frontend
```

## Building for Production

### Build everything:
```bash
npm run build
```

### Build individually:
```bash
npm run build:backend
npm run build:frontend
```

## Project Structure

```
carenest/
├── packages/
│   ├── backend/           # TypeScript Express API
│   │   ├── src/
│   │   │   ├── config/    # Configuration
│   │   │   ├── controllers/ # Route controllers
│   │   │   ├── middleware/  # Express middleware
│   │   │   ├── routes/      # API routes
│   │   │   ├── services/    # Business logic
│   │   │   ├── types/       # TypeScript types
│   │   │   └── index.ts     # Entry point
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── frontend/          # React TypeScript App
│       ├── src/
│       │   ├── components/  # React components
│       │   ├── contexts/    # React contexts
│       │   ├── hooks/       # Custom hooks
│       │   ├── services/    # API services
│       │   ├── types/       # TypeScript types
│       │   ├── utils/       # Utilities
│       │   ├── App.tsx      # Main component
│       │   └── main.tsx     # Entry point
│       ├── package.json
│       └── vite.config.ts
│
├── package.json           # Root package.json
├── setup.sh              # Setup script
└── README.md
```

## Testing the Application

### 1. Start the servers:
```bash
npm run dev
```

### 2. Open your browser:
Navigate to http://localhost:5173

### 3. Register a new user:
- Select your language
- Click "Log in / Sign up"
- Fill in the 4-step registration form
- Complete registration

### 4. Explore the app:
- View pregnancy progress on home page
- Navigate using bottom navigation
- (Additional features in development)

## Troubleshooting

### Port already in use

If port 5000 or 5173 is already in use:

**Backend:** Edit `packages/backend/.env`:
```env
PORT=5001
```

**Frontend:** Edit `packages/frontend/vite.config.ts`:
```typescript
server: {
  port: 5174,
  ...
}
```

### CORS errors

Make sure the `CORS_ORIGIN` in backend `.env` matches your frontend URL:
```env
CORS_ORIGIN=http://localhost:5173
```

### Dependencies issues

Try deleting `node_modules` and reinstalling:
```bash
rm -rf node_modules packages/*/node_modules
npm run install:all
```

## Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- JWT for authentication
- date-fns for date calculations

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Axios
- Lucide React (icons)

## Next Steps

For your hackathon presentation:

1. **Test all features** - Go through the registration flow
2. **Prepare demo data** - Register a few test users
3. **Customize content** - Update health tips and resources
4. **Add features** - Implement appointments, resources pages
5. **Styling tweaks** - Adjust colors/layout as needed

## Support

- Check README.md files in each package for detailed documentation
- Review code comments for implementation details
- Backend API endpoints documented in `packages/backend/README.md`

## License

MIT

---

Built with ❤️ for improving maternal healthcare
