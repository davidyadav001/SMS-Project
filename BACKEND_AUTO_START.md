# Backend Auto-Start Solution

## The Problem

The backend was failing to start because it requires a PostgreSQL database to be running, but the database wasn't starting automatically. You had to manually run `docker compose up -d db` every time.

**Error you were seeing:**
```
PrismaClientInitializationError: Can't reach database server at `localhost:5432`
```

## The Solution

I've created an automated solution that:

1. **Automatically checks if the database is running** before starting the backend
2. **Starts the database if it's not running**
3. **Waits for the database to be healthy** before proceeding
4. **Then starts the backend** automatically

## How to Use

### Option 1: Use the Updated Scripts (Recommended)

Now you can simply run:

```bash
# From project root - automatically ensures DB is running
npm run dev:backend

# Or from apps/backend directory
cd apps/backend
npm run start:dev
```

The database will be automatically started if needed!

### Option 2: Manual Database Management

You can also manage the database manually:

```bash
# Ensure database is running (checks and starts if needed)
npm run db:ensure

# Start database manually
npm run db:start

# Stop database
npm run db:stop

# Check database status
npm run db:status
```

## What Changed

1. **Created `scripts/ensure-db.js`**: A Node.js script that:
   - Checks if Docker is running
   - Checks if the database container exists and is running
   - Starts the database if it's not running
   - Waits for the database to be healthy
   - Provides clear status messages

2. **Updated `package.json` scripts**:
   - Added `db:ensure`, `db:start`, `db:stop`, `db:status` commands
   - Updated `dev:backend` to automatically run `db:ensure` first
   - Added `prestart:dev` hook in backend package.json

## How It Works

When you run `npm run dev:backend` or `npm run start:dev` from the backend:

1. The `prestart:dev` hook runs automatically (NPM lifecycle hook)
2. It executes `scripts/ensure-db.js`
3. The script checks Docker and database status
4. If database isn't running, it starts it
5. It waits for the database to be ready
6. Then the backend starts normally

## Troubleshooting

### If the script fails:

1. **Make sure Docker is running**:
   ```bash
   docker ps
   ```

2. **Check if the database container exists**:
   ```bash
   docker ps -a | grep sms_db
   ```

3. **Manually start the database**:
   ```bash
   npm run db:start
   ```

4. **Check database logs**:
   ```bash
   docker compose logs db
   ```

### If you want to disable auto-start:

You can still run the backend without auto-starting the database:

```bash
# Skip the pre-hook and run directly
cd apps/backend
nest start --watch
```

But make sure the database is running first!

## Summary

**Before**: You had to manually run `docker compose up -d db` every time  
**Now**: Just run `npm run dev:backend` and everything starts automatically! 🎉

