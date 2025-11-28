# CareNest

**Empowering Mothers, Nurturing Life**

CareNest is a comprehensive maternal health platform designed to provide accessible, reliable, and personalized antenatal and postnatal care support for mothers in Rwanda and beyond.

## Features

- 🤰 **Pregnancy Tracking** - Monitor pregnancy progress week by week
- 📅 **Appointment Management** - Schedule and manage antenatal checkups
- 🏥 **Health Records** - Centralized medical history and lab results
- 📚 **Educational Resources** - Expert articles and health tips
- 💬 **Chat Support** - Connect with midwives and healthcare professionals
- 🚨 **Emergency Contacts** - Quick access to emergency services
- 🌍 **Multi-language Support** - English, Kinyarwanda, and French

## Project Structure

```
carenest/
├── packages/
│   ├── backend/          # TypeScript Express API
│   ├── frontend/         # React TypeScript Application
│   └── shared/           # Shared types and utilities
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm run install:all
```

### Development

Run both frontend and backend in development mode:

```bash
npm run dev
```

Or run them separately:

```bash
# Backend (Port 5000)
npm run dev:backend

# Frontend (Port 5173)
npm run dev:frontend
```

### Building for Production

```bash
npm run build
```

## Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Lucide Icons

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL (recommended for production)
- JWT Authentication

## Environment Variables

See individual package READMEs for environment configuration:
- [Backend Environment Variables](./packages/backend/README.md)
- [Frontend Environment Variables](./packages/frontend/README.md)

## Contributing

This is a hackathon project. Contributions are welcome!

## License

MIT

## Team

Built with ❤️ for improving maternal healthcare access
