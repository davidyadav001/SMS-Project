# Architecture Documentation

## Overview

This Student Management System (SMS) is built as a modern monorepo with separate frontend and backend applications, following microservices principles with shared packages.

## Monorepo Structure

```
sms-monorepo/
├── apps/
│   ├── backend/          # NestJS API server
│   └── frontend/         # React SPA
├── packages/
│   ├── types/            # Shared TypeScript types
│   ├── utils/            # Shared utilities
│   └── ui/               # Shared UI components
├── docker-compose.yml    # Docker orchestration
└── package.json          # Root workspace config
```

## Backend Architecture

### Stack
- **Framework**: NestJS (Node.js)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + Passport
- **Validation**: class-validator + class-transformer

### Modules

1. **AuthModule**
   - JWT authentication
   - Role-based access control (RBAC)
   - Login/Register/Refresh token endpoints

2. **StudentModule**
   - Dashboard data aggregation
   - Attendance tracking
   - Grades management
   - Fee management

3. **StaffModule**
   - Student management
   - Attendance marking
   - Grade entry
   - Subject assignment

4. **LmsModule**
   - Study materials
   - Assignments
   - Quizzes
   - Progress tracking

5. **AdmissionModule**
   - Application forms
   - Status tracking
   - Document management

6. **AnnouncementModule**
   - Notifications
   - Event announcements

### Database Schema

Uses Prisma ORM with PostgreSQL. Key models:
- User (base authentication)
- Student (linked to User)
- Staff (linked to User)
- Class, Subject
- Fee, Attendance, Grade
- Material, Assignment, Quiz
- AdmissionForm

## Frontend Architecture

### Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **State Management**: Zustand + React Query
- **Routing**: React Router v6
- **HTTP Client**: Axios

### Portal Structure

1. **Student Portal** (`/student/*`)
   - Login page
   - Dashboard with stats
   - Attendance view
   - Grades view
   - Fee management

2. **LMS Portal** (`/lms/*`)
   - Learning materials
   - Assignment submission
   - Quiz attempts
   - Progress analytics

3. **Staff Portal** (`/staff/*`)
   - Student management
   - Attendance marking
   - Grade entry
   - Subject management

4. **Admission Portal** (`/admission/*`)
   - Application dashboard
   - Application tracking
   - Status management

### Component Architecture

- **Layout Components**: DashboardLayout, Sidebar, Topbar
- **Page Components**: One per route
- **Shared Components**: ProtectedRoute, form components
- **Utility**: API client, auth store, services

## Authentication Flow

1. User logs in via portal-specific login page
2. Backend validates credentials and returns JWT tokens
3. Frontend stores tokens in localStorage + Zustand store
4. API requests include Bearer token in Authorization header
5. Backend JWT guard validates token and extracts user info
6. Role-based guards check user permissions per route

## API Endpoints

Base URL: `/api`

### Auth
- `POST /auth/login` - Login
- `POST /auth/register` - Register (admin only)
- `POST /auth/refresh` - Refresh token
- `POST /auth/profile` - Get user profile

### Student
- `GET /student/dashboard` - Dashboard data
- `GET /student/attendance` - Attendance records
- `GET /student/grades` - Grade records
- `GET /student/fees` - Fee records
- `PATCH /student/fees/:id/pay` - Mark fee as paid

### Staff
- `GET /staff/dashboard` - Dashboard data
- `GET /staff/students` - List students
- `POST /staff/attendance` - Mark attendance
- `POST /staff/grades` - Add grade
- `GET /staff/subjects` - List assigned subjects

### LMS
- `GET /lms/materials` - Study materials
- `GET /lms/assignments` - Assignments
- `POST /lms/assignments/submit` - Submit assignment
- `GET /lms/quizzes` - Quizzes
- `POST /lms/quizzes/:id/start` - Start quiz
- `POST /lms/quizzes/attempts/:id/submit` - Submit quiz
- `GET /lms/progress` - Progress analytics

### Admission
- `POST /admission/apply` - Submit application
- `GET /admission/applications` - List applications (admin/staff)
- `GET /admission/applications/:id` - Get application
- `PATCH /admission/applications/:id/status` - Update status
- `GET /admission/dashboard` - Dashboard stats

### Announcements
- `GET /announcements` - List announcements
- `GET /announcements/:id` - Get announcement
- `POST /announcements` - Create (admin/staff)
- `PATCH /announcements/:id` - Update (admin/staff)
- `DELETE /announcements/:id` - Delete (admin/staff)

## Security Features

1. **JWT Authentication**: Secure token-based auth
2. **Password Hashing**: bcrypt with salt rounds
3. **Role-Based Access Control**: Route and API protection
4. **Input Validation**: DTOs with class-validator
5. **CORS Configuration**: Whitelisted origins
6. **Rate Limiting**: Throttler module (optional)

## Deployment

### Docker

- Multi-stage builds for optimization
- Separate services for db, backend, frontend
- Nginx reverse proxy for frontend
- Volume mounts for development

### Environment Variables

Backend:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_REFRESH_SECRET` - Refresh token secret
- `PORT` - Server port (default: 3001)
- `FRONTEND_URL` - CORS origin

Frontend:
- `VITE_API_URL` - Backend API URL

## Development Workflow

1. Install dependencies: `npm install`
2. Set up environment variables
3. Start PostgreSQL (Docker or local)
4. Run migrations: `npm run prisma:migrate`
5. Seed database: `npm run prisma:seed`
6. Start dev servers: `npm run dev`

## Testing

- Backend: Jest (unit + e2e)
- Frontend: Testing Library (optional)
- CI/CD: GitHub Actions

## Code Quality

- **ESLint**: Linting for TypeScript/React
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks
- **TypeScript**: Strict type checking

