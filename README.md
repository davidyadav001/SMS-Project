# Student Management System (SMS)
## Radiant Readers' Academy

A modern, production-ready Student Management System with multiple portals for students, staff, LMS, and admissions.

### 🏗 Architecture

Monorepo structure:
- `apps/frontend/` - React + TypeScript + TailwindCSS + Framer Motion
- `apps/backend/` - NestJS + TypeScript + Prisma + PostgreSQL
- `packages/ui/` - Shared UI components
- `packages/types/` - Shared TypeScript interfaces
- `packages/utils/` - Common utilities

### 🚀 Quick Start

> **📖 For detailed setup instructions, see [QUICK_START.md](./QUICK_START.md)**

#### Prerequisites
- Node.js >= 18 (v18.x or v20.x LTS)
- npm (comes with Node.js)
- Docker & Docker Compose (for database)
- Git (optional)

#### Quick Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
# From repo root
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env

# Edit .env files with your configuration
```

3. **Start database (Docker):**
```bash
docker-compose up -d db
```

4. **Run Prisma migrations and seed:**
```bash
cd apps/backend
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

5. **Start development servers:**
```bash
# From root (both services)
npm run dev

# Or separately:
npm run dev:backend   # Terminal 1
npm run dev:frontend  # Terminal 2
```

### 📦 Portals

- **Student Portal** (`/student/login`) - Dashboard, grades, attendance, fees
- **LMS Portal** (`/lms/login`) - Learning materials, assignments, quizzes
- **Staff Portal** (`/staff/login`) - Attendance, grading, announcements
- **Admission Portal** (`/admission/login`) - Application forms, tracking

### 🔐 Default Credentials

After seeding:
- Student: `student@example.com` / `password123`
- Staff: `staff@example.com` / `password123`
- Admin: `admin@example.com` / `password123`

### 🐳 Docker Deployment

```bash
docker-compose up -d
```

### 📝 Development

- `npm run dev` - Start all services (backend + frontend)
- `npm run dev:backend` - Start backend only
- `npm run dev:frontend` - Start frontend only
- `npm run build` - Build all packages
- `npm run lint` - Lint all packages
- `npm run format` - Format code with Prettier

### 🧪 Testing

```bash
npm run test
```

### 📄 License

Private - Radiant Readers' Academy

