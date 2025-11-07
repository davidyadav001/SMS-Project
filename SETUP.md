# Setup Guide

## Prerequisites

- Node.js >= 18
- PostgreSQL >= 15 (or use Docker)
- npm or yarn

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Backend:
```bash
cd apps/backend
cp .env.example .env
# Edit .env with your database credentials
```

Frontend:
```bash
cd apps/frontend
cp .env.example .env
```

### 3. Set Up Database

Using Docker:
```bash
docker-compose up -d db
```

Or install PostgreSQL locally and update `DATABASE_URL` in `apps/backend/.env`.

### 4. Run Database Migrations

```bash
cd apps/backend
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### 5. Start Development Servers

From root directory:
```bash
npm run dev
```

Or separately:
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

### 6. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api

## Default Credentials

After seeding:
- **Admin**: admin@example.com / password123
- **Staff**: staff@example.com / password123
- **Student**: student@example.com / password123

## Docker Deployment

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Development

### Backend

```bash
cd apps/backend

# Generate Prisma Client
npm run prisma:generate

# Create migration
npm run prisma:migrate

# Seed database
npm run prisma:seed

# Open Prisma Studio
npm run prisma:studio
```

### Frontend

```bash
cd apps/frontend

# Build for production
npm run build

# Preview production build
npm run preview
```

## Testing

```bash
# Run all tests
npm test

# Run backend tests
cd apps/backend && npm test

# Run frontend tests
cd apps/frontend && npm test
```

## Troubleshooting

### Database Connection Issues

1. Ensure PostgreSQL is running
2. Check `DATABASE_URL` in `.env`
3. Verify database exists
4. Check firewall/port settings

### Port Already in Use

Change ports in:
- Backend: `apps/backend/.env` (PORT)
- Frontend: `apps/frontend/vite.config.ts` (server.port)

### Prisma Issues

```bash
cd apps/backend
npm run prisma:generate
npm run prisma:migrate reset  # Warning: This will delete all data
```

