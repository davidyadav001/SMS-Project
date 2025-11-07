# Debugging Network Errors

## Common Network Errors

### 1. "Cannot connect to server"

**Error:** `ERR_NETWORK`, `ECONNREFUSED`, or "Network error"

**Causes:**
- Backend server is not running
- Wrong port in `VITE_API_URL`
- Firewall blocking connection
- Backend crashed or not started

**Solutions:**

1. **Check if backend is running:**
   ```bash
   cd apps/backend
   npm run start:dev
   ```
   
   You should see:
   ```
   🚀 Server running on http://localhost:3001/api
   ```

2. **Verify backend is accessible:**
   ```bash
   curl http://localhost:3001/api
   # Or in browser: http://localhost:3001/api
   ```

3. **Check environment variables:**
   ```bash
   # Frontend .env
   cat apps/frontend/.env
   # Should have: VITE_API_URL=http://localhost:3001/api
   ```

4. **Check backend .env:**
   ```bash
   # Backend .env
   cat apps/backend/.env
   # Should have: PORT=3001
   ```

### 2. CORS Errors

**Error:** `CORS policy`, "Access-Control-Allow-Origin"

**Causes:**
- Frontend URL not whitelisted in backend CORS
- Missing CORS headers

**Solutions:**

1. **Check backend CORS config** (`apps/backend/src/main.ts`):
   ```typescript
   app.enableCors({
     origin: 'http://localhost:3000', // Should match your frontend URL
     credentials: true,
   });
   ```

2. **Verify FRONTEND_URL in backend .env:**
   ```env
   FRONTEND_URL=http://localhost:3000
   ```

### 3. Timeout Errors

**Error:** `ETIMEDOUT`, "Request timeout"

**Causes:**
- Server is slow to respond
- Database connection issues
- Network latency

**Solutions:**

1. **Check database connection:**
   ```bash
   docker compose ps
   # Database should be running
   ```

2. **Check backend logs** for slow queries

3. **Increase timeout** (already set to 10 seconds in api.ts)

## Quick Diagnostic Commands

```bash
# 1. Check if backend is running
curl http://localhost:3001/api
# Should return 404 or some response (not connection refused)

# 2. Check if frontend can reach backend
# Open browser DevTools > Network tab
# Try login and check the request

# 3. Check backend logs
# Look at terminal where backend is running
# Should see request logs

# 4. Test API directly
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com","password":"password123"}'
```

## Frontend Error Handling

The updated code now:

1. ✅ Detects network errors specifically
2. ✅ Shows clear error messages
3. ✅ Logs errors to console for debugging
4. ✅ Handles timeout errors
5. ✅ Distinguishes between network and auth errors

## Testing the Fix

1. **Start backend:**
   ```bash
   cd apps/backend
   npm run start:dev
   ```

2. **Start frontend:**
   ```bash
   cd apps/frontend
   npm run dev
   ```

3. **Try to login** - you should now see clear error messages

4. **If network error:**
   - Check backend is running
   - Check browser console (F12) for details
   - Verify `VITE_API_URL` in frontend `.env`




