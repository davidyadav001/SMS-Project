# Setup Verification Checklist

Use this checklist to verify your setup is complete and working correctly.

## ✅ Pre-Setup Checklist

- [ ] Node.js v18.x or v20.x installed (`node -v`)
- [ ] npm installed (`npm -v`)
- [ ] Docker installed (`docker --version`)
- [ ] Docker Compose installed (`docker-compose --version`)
- [ ] Git installed (optional, `git --version`)

## ✅ File Structure Checklist

- [ ] `apps/backend/.env` exists (created from `.env.example`)
- [ ] `apps/frontend/.env` exists (created from `.env.example`)
- [ ] `apps/backend/.env` has correct `DATABASE_URL`
- [ ] `apps/backend/.env` has `JWT_SECRET` and `JWT_REFRESH_SECRET` set
- [ ] `apps/frontend/.env` has `VITE_API_URL` set
- [ ] `node_modules` installed in root and apps

## ✅ Database Checklist

- [ ] PostgreSQL database container running (`docker-compose ps`)
- [ ] Can connect to database (check logs: `docker logs sms_db`)
- [ ] Prisma client generated (`npm run prisma:generate` successful)
- [ ] Migrations applied (`npm run prisma:migrate` successful)
- [ ] Database seeded (`npm run prisma:seed` successful)
- [ ] Can verify data in Prisma Studio (`npx prisma studio`)

## ✅ Backend Checklist

- [ ] Backend dependencies installed (`cd apps/backend && npm install`)
- [ ] Backend builds successfully (`npm run build`)
- [ ] Backend starts without errors (`npm run start:dev`)
- [ ] Backend accessible at http://localhost:3001/api
- [ ] API health check returns 200 (or test endpoint)
- [ ] No TypeScript errors (`npm run lint`)

## ✅ Frontend Checklist

- [ ] Frontend dependencies installed (`cd apps/frontend && npm install`)
- [ ] Frontend builds successfully (`npm run build`)
- [ ] Frontend starts without errors (`npm run dev`)
- [ ] Frontend accessible at http://localhost:3000
- [ ] No TypeScript errors (`npm run lint`)

## ✅ Authentication Checklist

- [ ] Can login with `admin@example.com` / `password123`
- [ ] Can login with `staff@example.com` / `password123`
- [ ] Can login with `student@example.com` / `password123`
- [ ] JWT tokens are generated and stored
- [ ] Protected routes work correctly
- [ ] Logout works correctly

## ✅ Docker Checklist (Optional)

- [ ] `docker-compose up -d` starts all services
- [ ] All containers running (`docker-compose ps`)
- [ ] Backend container logs show no errors
- [ ] Frontend container logs show no errors
- [ ] Database container is healthy
- [ ] Can access frontend through Docker

## 🔧 Quick Commands to Verify

```bash
# Check versions
node -v          # Should be v18.x or v20.x
npm -v           # Should be v8.x or v9.x
docker --version # Should show Docker version

# Check environment files
ls -la apps/backend/.env
ls -la apps/frontend/.env

# Check Docker
docker-compose ps
docker logs sms_db

# Check Prisma
cd apps/backend
npm run prisma:studio  # Opens at http://localhost:5555

# Check backend
cd apps/backend
npm run lint
npm run build
npm run start:dev

# Check frontend
cd apps/frontend
npm run lint
npm run build
npm run dev
```

## 🐛 Common Issues & Fixes

### Environment Files Missing
```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env
```

### Database Connection Issues
- Check `DATABASE_URL` in `apps/backend/.env`
- For Docker: use `db` as hostname
- For local: use `localhost` as hostname
- Verify database container is running: `docker-compose ps`

### Port Already in Use
```bash
# Find process using port
lsof -i :3001  # Backend
lsof -i :3000  # Frontend
lsof -i :5432  # PostgreSQL

# Kill process or change port in .env
```

### Prisma Issues
```bash
cd apps/backend
npm run prisma:generate
npm run prisma:migrate reset --force  # WARNING: Deletes all data
npm run prisma:seed
```

### Module Not Found Errors
```bash
# From root
npm install

# Or per app
cd apps/backend && npm install
cd apps/frontend && npm install
```

## ✅ Final Verification

After completing all checklists:

1. ✅ Backend API is accessible at http://localhost:3001/api
2. ✅ Frontend app is accessible at http://localhost:3000
3. ✅ Can login with test credentials
4. ✅ Dashboard loads correctly for each portal
5. ✅ No console errors in browser
6. ✅ No errors in backend logs

If all checks pass, your setup is complete! 🎉




