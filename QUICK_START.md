# Quick Start Guide - SMS Monorepo

## Prerequisites

Make sure you have these installed:

- **Node.js** — use v18.x or v20.x (LTS)
- **npm** (comes with Node), or if the repo uses pnpm/yarn, use that
- **Docker & Docker Compose** (for running Postgres DB and Docker flow)
- **Git** (optional, for cloning/updating repo)

### Check versions:

```bash
node -v
npm -v
docker --version
docker-compose --version
```

## 1. Clone & Install Dependencies

If you haven't already cloned the repo:

```bash
git clone <your-repo-url> sms-project
cd sms-project
```

Install dependencies at the repo root (workspaces):

```bash
npm install
```

## 2. Environment Files

Copy example env files to each app that needs them.

```bash
# From repo root
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env
```

### Backend `.env` (minimal example):

```env
DATABASE_URL=postgresql://sms_user:sms_password@localhost:5432/sms_db?schema=public
PORT=3001
JWT_SECRET=supersecret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=another_supersecret_refresh_key_change_in_production
JWT_REFRESH_EXPIRES_IN=30d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Note**: When using Docker Compose for DB, use `db` as hostname:
```env
DATABASE_URL=postgresql://sms_user:sms_password@db:5432/sms_db?schema=public
```

### Frontend `.env`:

```env
VITE_API_URL=http://localhost:3001/api
```

## 3. Start Database (Docker Compose)

From the repo root:

```bash
docker-compose up -d db
```

To start everything (db + other infra):

```bash
docker-compose up -d
```

Check DB is up:

```bash
docker-compose ps
docker logs sms_db
```

## 4. Prisma — Generate, Migrate, Seed

Go to the backend folder and run Prisma tasks:

```bash
cd apps/backend
npm run prisma:generate       # ensures client is generated
npm run prisma:migrate        # runs migrations (may ask for a name if none)
npm run prisma:seed           # seeds sample data (admin/staff/student)
```

**Quick alternative to reset DB** (danger: destructive):

```bash
# from apps/backend
npx prisma migrate reset --force
npm run prisma:seed
```

**Open Prisma Studio** to inspect DB:

```bash
npx prisma studio
# then visit http://localhost:5555
```

## 5. Start Services (Dev)

### Option A — Start both at once (from root):

```bash
# run from repo root
npm run dev
```

### Option B — Run individually:

**Backend** (Terminal 1):

```bash
cd apps/backend
npm run start:dev    # or npm run dev
```

**Frontend** (Terminal 2):

```bash
cd apps/frontend
npm run dev          # Vite dev server
# frontend usually runs at http://localhost:3000
```

### Access URLs:

- **Backend API**: http://localhost:3001/api
- **Frontend app**: http://localhost:3000

## 6. Default Credentials & Login

After seeding, you can log in with seeded users:

- **Admin**: `admin@example.com` / `password123`
- **Staff**: `staff@example.com` / `password123`
- **Student**: `student@example.com` / `password123`

### If login fails:

1. Check `prisma:seed` completed and DB contains users
2. Check backend logs for auth errors (JWT secret mismatch, DB connection error)
3. Verify environment variables are set correctly

## 7. Common Scripts

### From repo root:

```bash
npm run dev              # start both backend and frontend
npm run dev:backend      # start backend only
npm run dev:frontend     # start frontend only
npm run build            # build all packages
npm run lint             # lint all packages
npm run format           # format code with Prettier
```

### Backend:

```bash
cd apps/backend
npm run lint
npm run build
npm run test
npm run start:prod       # starts compiled JS
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run prisma:studio
```

### Frontend:

```bash
cd apps/frontend
npm run lint
npm run build
npm run preview          # serve build locally (Vite)
```

### Docker (to run full stack via containers):

```bash
# build and run all containers (app + db + nginx)
docker-compose up --build -d

# tail logs
docker-compose logs -f

# stop services
docker-compose down
```

## 8. Production Build (Local Test)

**Build backend:**

```bash
cd apps/backend
npm run build
```

**Build frontend:**

```bash
cd apps/frontend
npm run build
```

Serve frontend with configured Nginx (Docker Compose sets this up):

```bash
docker-compose up --build
```

## 9. Troubleshooting

### DB connection refused

- Ensure Docker DB started: `docker-compose ps`
- Check `DATABASE_URL` host matches (`db` vs `localhost`)
- Verify database credentials

### Prisma migrate complains or fails

```bash
npx prisma migrate dev
# or reset (dev only)
npx prisma migrate reset --force
npm run prisma:seed
```

### Seed not creating users

- Check `.env` file is in `apps/backend/`
- Verify `DATABASE_URL` is correct
- Run with explicit env: `NODE_ENV=development npm run prisma:seed`

### CORS errors in browser

- Confirm backend CORS is enabled for frontend origin `http://localhost:3000`
- Check `FRONTEND_URL` in backend `.env`

### JWT auth failing

- Ensure `JWT_SECRET` and `JWT_REFRESH_SECRET` are set
- Check tokens aren't expired
- Verify environment variables match between backend and seed script

### Port already in use

```bash
# Find process using port
lsof -i :3001  # or :3000
# Kill process or change port in .env
```

### Frontend can't reach backend in Docker

- If frontend runs on host and backend in container, use `localhost` with exposed ports
- If both in containers, use container names (`backend`, `db`)
- Verify `VITE_API_URL` points to correct backend URL

## 10. Useful Commands Summary

```bash
# From repo root
npm install

# Start infra
docker-compose up -d db

# Backend: generate, migrate, seed
cd apps/backend
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed

# Start backend dev
npm run start:dev    # or npm run dev

# Start frontend dev (new terminal)
cd apps/frontend
npm run dev

# Or start both from root
npm run dev
```

## Next Steps

- Read `ARCHITECTURE.md` for system design
- Check `README.md` for project overview
- Explore the codebase structure in `apps/` and `packages/`

Happy coding! 🚀




