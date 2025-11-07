# Fix Database Connection Error

## Problem

Error: `Can't reach database server at localhost:5432`

This means the PostgreSQL database container is not running or not accessible.

## Quick Fix

### Step 1: Start Database Container

```bash
# From project root
docker compose up -d db
```

### Step 2: Verify Database is Running

```bash
docker compose ps
```

You should see `sms_db` with status `Up (healthy)`

### Step 3: Check Database is Ready

```bash
docker compose logs db | tail -5
```

Look for: `database system is ready to accept connections`

### Step 4: Restart Backend

After database is running, restart your backend:

```bash
cd apps/backend
npm run start:dev
```

## Common Issues

### Issue 1: Database Container Not Running

**Solution:**
```bash
docker compose up -d db
```

### Issue 2: Database Still Starting

**Wait 5-10 seconds** after starting, then check:
```bash
docker compose ps
```

Status should be `Up (healthy)`, not `Up (health: starting)`

### Issue 3: Wrong DATABASE_URL

**Check your .env file:**
```bash
cd apps/backend
cat .env | grep DATABASE_URL
```

**Should be:**
```env
DATABASE_URL="postgresql://sms_user:sms_password@localhost:5432/sms_db?schema=public"
```

**For local development (running from host machine):**
- Use `localhost:5432`

**For Docker (running backend in container):**
- Use `db:5432`

### Issue 4: Port Already in Use

If port 5432 is already in use:

```bash
# Find what's using port 5432
sudo lsof -i :5432

# Or change port in docker-compose.yml
# And update DATABASE_URL accordingly
```

## Verification Commands

```bash
# 1. Check container status
docker compose ps

# 2. Check database logs
docker compose logs db

# 3. Test connection
docker compose exec db psql -U sms_user -d sms_db -c "SELECT 1;"

# 4. Check backend .env
cd apps/backend
cat .env | grep DATABASE_URL
```

## Auto-Start Script

To automatically start database when needed, add to your shell profile:

```bash
# Add to ~/.bashrc or ~/.zshrc
alias sms-db-start='cd /home/david/Desktop/SMS\ Project && docker compose up -d db'
```

Then just run: `sms-db-start`

## Persistent Database

The database data is stored in a Docker volume, so it persists even if you stop the container:

```bash
# Stop database (keeps data)
docker compose stop db

# Start database (uses existing data)
docker compose start db

# Remove database (DELETES ALL DATA!)
docker compose down -v
```



