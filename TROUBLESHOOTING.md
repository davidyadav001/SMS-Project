# Troubleshooting Guide

## Common Setup Issues

### Issue: `DATABASE_URL` environment variable not found

**Error:**
```
Error: Prisma schema validation
error: Environment variable not found: DATABASE_URL.
```

**Solution:**
1. Make sure you created the `.env` file:
   ```bash
   cd apps/backend
   cp .env.example .env
   ```

2. Verify the `.env` file exists and has `DATABASE_URL`:
   ```bash
   cat apps/backend/.env | grep DATABASE_URL
   ```

3. If using Docker, make sure the database container is running:
   ```bash
   docker compose up -d db
   docker compose ps
   ```

### Issue: Docker Compose command not found

**Error:**
```
Command 'docker-compose' not found
```

**Solution:**
Use the newer Docker Compose v2 syntax (space instead of hyphen):
```bash
# Old syntax (may not work):
docker-compose up -d db

# New syntax (Docker Compose v2):
docker compose up -d db
```

### Issue: Cannot connect to database

**Error:**
```
Can't reach database server at `db:5432`
```

**Solutions:**

**Option 1: Using Docker (Recommended)**
```bash
# Start database container
docker compose up -d db

# Verify it's running
docker compose ps

# Use this DATABASE_URL in .env:
DATABASE_URL="postgresql://sms_user:sms_password@db:5432/sms_db?schema=public"
```

**Option 2: Using Local PostgreSQL**
If you have PostgreSQL installed locally:

1. Create database and user:
   ```bash
   sudo -u postgres psql
   ```
   Then in psql:
   ```sql
   CREATE DATABASE sms_db;
   CREATE USER sms_user WITH PASSWORD 'sms_password';
   GRANT ALL PRIVILEGES ON DATABASE sms_db TO sms_user;
   \q
   ```

2. Update `.env` to use localhost:
   ```env
   DATABASE_URL="postgresql://sms_user:sms_password@localhost:5432/sms_db?schema=public"
   ```

### Issue: Prisma migration fails

**Error:**
```
Prisma migrate dev failed
```

**Solutions:**

1. Make sure database is accessible:
   ```bash
   # Test connection (if using Docker)
   docker compose exec db psql -U sms_user -d sms_db
   ```

2. Reset migrations (⚠️ **WARNING**: This deletes all data):
   ```bash
   cd apps/backend
   npx prisma migrate reset --force
   npm run prisma:seed
   ```

3. Check Prisma schema is valid:
   ```bash
   npx prisma validate
   ```

### Issue: Port already in use

**Error:**
```
Port 3001 is already in use
Port 3000 is already in use
Port 5432 is already in use
```

**Solutions:**

1. Find process using port:
   ```bash
   # Linux
   sudo lsof -i :3001
   sudo lsof -i :3000
   sudo lsof -i :5432
   
   # Or
   sudo netstat -tulpn | grep :3001
   ```

2. Kill the process or change port in `.env`:
   ```env
   PORT=3002  # Change backend port
   ```

3. For frontend, edit `vite.config.ts`:
   ```typescript
   server: {
     port: 3001,  // Change frontend port
   }
   ```

### Issue: Module not found errors

**Error:**
```
Cannot find module '@sms/backend'
Module not found
```

**Solution:**
Install dependencies:
```bash
# From root
npm install

# Or per workspace
cd apps/backend && npm install
cd apps/frontend && npm install
```

### Issue: Prisma Client not generated

**Error:**
```
@prisma/client did not initialize yet. Please run "prisma generate"
```

**Solution:**
```bash
cd apps/backend
npm run prisma:generate
```

### Issue: JWT authentication fails

**Error:**
```
Unauthorized
Invalid token
```

**Solutions:**

1. Check JWT secrets are set in `.env`:
   ```env
   JWT_SECRET="your-secret-key"
   JWT_REFRESH_SECRET="your-refresh-secret-key"
   ```

2. Clear localStorage and try logging in again:
   ```javascript
   // In browser console
   localStorage.clear()
   ```

3. Verify backend is running and accessible:
   ```bash
   curl http://localhost:3001/api/auth/profile
   ```

### Issue: CORS errors in browser

**Error:**
```
Access to fetch at 'http://localhost:3001/api' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution:**
Check `FRONTEND_URL` in backend `.env`:
```env
FRONTEND_URL=http://localhost:3000
```

### Quick Health Check Commands

```bash
# Check Docker containers
docker compose ps

# Check database connection
cd apps/backend
npx prisma db pull

# Check backend is running
curl http://localhost:3001/api

# Check frontend is running
curl http://localhost:3000

# View logs
docker compose logs -f db
docker compose logs -f backend
docker compose logs -f frontend
```

### Getting Help

1. Check logs:
   ```bash
   # Backend logs
   cd apps/backend && npm run start:dev
   
   # Frontend logs (in browser console)
   # Open DevTools > Console
   ```

2. Verify environment:
   ```bash
   node -v    # Should be v18.x or v20.x
   npm -v     # Should be v8.x or v9.x
   docker compose version
   ```

3. Check Prisma Studio:
   ```bash
   cd apps/backend
   npx prisma studio
   # Opens at http://localhost:5555
   ```




