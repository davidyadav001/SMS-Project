# Environment Configuration Guide

## Database URL Configuration

The `DATABASE_URL` needs to be different depending on where you're running your commands:

### Running from Host Machine (Local Development)

When you run Prisma commands or the backend server from your host machine (outside Docker), use `localhost`:

```env
DATABASE_URL="postgresql://sms_user:sms_password@localhost:5432/sms_db?schema=public"
```

**Why?** Because when running from your host machine, Docker containers are accessible via `localhost` on the exposed ports.

### Running from Docker Container

When the backend runs inside a Docker container, use `db` as the hostname:

```env
DATABASE_URL="postgresql://sms_user:sms_password@db:5432/sms_db?schema=public"
```

**Why?** Because containers in the same Docker network can reach each other using service names.

## Quick Switch Script

You can create a simple script to switch between the two:

```bash
# Switch to localhost (for local dev)
sed -i 's|@db:5432|@localhost:5432|g' apps/backend/.env

# Switch to db (for Docker)
sed -i 's|@localhost:5432|@db:5432|g' apps/backend/.env
```

## Recommended Setup

For **local development** (running `npm run start:dev` from host):

1. Use `localhost` in your `.env` file
2. Start database: `docker compose up -d db`
3. Run migrations: `npm run prisma:migrate` (from host)
4. Start backend: `npm run start:dev` (from host)

For **Docker deployment** (running everything in containers):

1. Use `db` in your `.env` file (or set via docker-compose environment)
2. Start everything: `docker compose up -d`
3. Backend will automatically connect using `db` hostname

## Current Configuration

Check your current `DATABASE_URL`:

```bash
cd apps/backend
grep "^DATABASE_URL" .env
```

The `.env.example` file uses `localhost` by default for local development.




