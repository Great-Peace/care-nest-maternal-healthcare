# CareNest Backend API

TypeScript Express API for CareNest maternal health platform.

## Features

- ✅ User registration and authentication
- ✅ Pregnancy tracking and calculations
- ✅ Appointment management
- ✅ Health resources and tips
- ✅ JWT-based authentication
- ✅ RESTful API design

## Getting Started

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:5173
```

### Development

```bash
npm run dev
```

The API will run on `http://localhost:5000`

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User Management

- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `DELETE /api/users/profile` - Delete user profile (protected)

### Appointments

- `POST /api/appointments` - Create appointment (protected)
- `GET /api/appointments` - Get all user appointments (protected)
- `GET /api/appointments/upcoming` - Get upcoming appointments (protected)
- `PUT /api/appointments/:id` - Update appointment (protected)
- `DELETE /api/appointments/:id` - Delete appointment (protected)

### Health Resources

- `GET /api/health/resources` - Get health resources
- `GET /api/health/resources/:id` - Get specific resource
- `GET /api/health/tips` - Get health tips

### Health Check

- `GET /api/health-check` - API health check

## Authentication

Protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Data Storage

Currently uses in-memory storage. For production, replace with a database:

- PostgreSQL (recommended)
- MongoDB
- MySQL

## Project Structure

```
src/
├── config/           # Configuration files
├── controllers/      # Request handlers
├── middleware/       # Express middleware
├── models/          # Data models (future database integration)
├── routes/          # API routes
├── services/        # Business logic
├── types/           # TypeScript type definitions
└── index.ts         # Application entry point
```

## Technologies

- Express.js
- TypeScript
- JWT for authentication
- date-fns for date calculations
- Zod for validation

## Future Improvements

- [ ] Database integration (PostgreSQL)
- [ ] SMS notifications for appointments
- [ ] File upload for lab results
- [ ] Real-time chat with midwives
- [ ] Email notifications
- [ ] Rate limiting
- [ ] API documentation (Swagger)
- [ ] Unit and integration tests
