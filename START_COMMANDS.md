# Starting the Development Servers

## Quick Reference

### From Root Directory

Start both services:
```bash
npm run dev
```

Or start separately:
```bash
npm run dev:backend   # Starts backend on http://localhost:3001
npm run dev:frontend  # Starts frontend on http://localhost:3000
```

### From Individual App Directories

**Backend** (`apps/backend/`):
```bash
cd apps/backend
npm run start:dev     # ← Use this (NOT dev:backend)
```

**Frontend** (`apps/frontend/`):
```bash
cd apps/frontend
npm run dev
```

## Common Confusion

❌ **Wrong** (from `apps/backend/`):
```bash
npm run dev:backend   # This script doesn't exist in backend package.json
```

✅ **Correct** (from `apps/backend/`):
```bash
npm run start:dev     # This is the actual script name
```

## Explanation

- `dev:backend` is a root-level script that runs `npm run start:dev --workspace=apps/backend`
- `start:dev` is the actual script defined in `apps/backend/package.json`
- When inside `apps/backend/`, use the script name directly (`start:dev`)
- When at root, use the workspace script (`dev:backend`)

## Recommended Workflow

**Option 1: Run from root (easiest)**
```bash
# Terminal 1 - Start both
npm run dev

# Or Terminal 1 - Backend only
npm run dev:backend

# Terminal 2 - Frontend only  
npm run dev:frontend
```

**Option 2: Run from individual directories**
```bash
# Terminal 1
cd apps/backend
npm run start:dev

# Terminal 2
cd apps/frontend
npm run dev
```




