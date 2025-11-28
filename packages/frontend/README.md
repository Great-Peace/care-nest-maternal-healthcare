# CareNest Frontend

React + TypeScript + Vite frontend application for CareNest.

## Features

- ✅ Modern React 18 with TypeScript
- ✅ Vite for fast development and building
- ✅ TailwindCSS for styling
- ✅ Component-based architecture
- ✅ Authentication with JWT
- ✅ Responsive mobile-first design
- ✅ Multi-language support (English, Kinyarwanda, French)

## Getting Started

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173`

### Build

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── welcome/          # Welcome screen component
│   ├── registration/     # Registration flow components
│   ├── home/            # Home page component
│   ├── appointments/    # Appointments components
│   ├── resources/       # Resources components
│   ├── profile/         # Profile components
│   └── common/          # Shared components
├── contexts/            # React contexts
├── hooks/              # Custom React hooks
├── services/           # API services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── App.tsx             # Main app component
├── main.tsx            # Application entry point
└── index.css           # Global styles

## Technologies

- React 18
- TypeScript
- Vite
- TailwindCSS
- Axios
- Lucide Icons
- date-fns

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Components

### Welcome Screen
Initial landing page with language selection

### Registration Flow
Multi-step registration:
1. Personal Information
2. Pregnancy Information
3. Medical History
4. Emergency Contact

### Main App
- Home Dashboard
- Appointments Manager
- Health Resources
- User Profile

## API Integration

The app connects to the backend API at `VITE_API_URL`.

All API calls use Axios with interceptors for:
- Adding JWT tokens to requests
- Handling authentication errors
- Request/response logging

## State Management

Uses React Context API for global state:
- `AuthContext` - User authentication and profile data

## Styling

TailwindCSS with custom theme configuration.

Primary colors:
- Pink: `#ec4899`
- Purple: `#a855f7`
- Indigo: `#6366f1`
