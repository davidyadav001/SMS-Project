# Login Credentials

## Default User Credentials

After running the database seed script (`npm run prisma:seed`), the following accounts are available:

### 👨‍🎓 Student Portal

**Email:** `student@example.com`  
**Password:** `password123`

**Profile Details:**
- Name: Alice Smith
- Class: 10A
- Roll Number: 1

---

**Email:** `student2@example.com`  
**Password:** `password123`

**Profile Details:**
- Name: Bob Johnson
- Class: 10A
- Roll Number: 2

---

### 👨‍🏫 Staff Portal

**Email:** `staff@example.com`  
**Password:** `password123`

**Profile Details:**
- Name: John Doe
- Department: Mathematics
- Position: Senior Teacher

---

### 👨‍💼 Admin Portal

**Email:** `admin@example.com`  
**Password:** `password123`

**Profile Details:**
- Role: Administrator
- Full system access

---

## Portal Access URLs

After starting the frontend (`npm run dev:frontend`), access portals at:

- **Landing Page:** http://localhost:3000
- **Student Portal Login:** http://localhost:3000/student/login
- **LMS Portal Login:** http://localhost:3000/lms/login
- **Staff Portal Login:** http://localhost:3000/staff/login
- **Admission Portal Login:** http://localhost:3000/admission/login

## After Login

- **Student:** Redirects to `/student/dashboard`
- **Staff:** Redirects to `/staff/dashboard`
- **LMS:** Redirects to `/lms/dashboard`
- **Admission:** Redirects to `/admission/dashboard`

## Important Notes

⚠️ **These are default credentials for development only!**

- Change all passwords in production
- Use strong, unique passwords
- Never commit real credentials to version control
- Rotate passwords regularly

## Creating New Users

To create additional users, you can:

1. **Via API (if register endpoint is enabled):**
   ```bash
   curl -X POST http://localhost:3001/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "email": "newuser@example.com",
       "password": "securepassword",
       "role": "student"
     }'
   ```

2. **Via Prisma Studio:**
   ```bash
   cd apps/backend
   npx prisma studio
   # Open http://localhost:5555
   # Navigate to User table and add manually
   ```

3. **Via Seed Script:**
   - Edit `apps/backend/prisma/seed.ts`
   - Add new user entries
   - Run `npm run prisma:seed` again

## Password Reset

Currently, password reset functionality is not implemented. For development:
- Use Prisma Studio to update passwords directly
- Or recreate users via seed script

## Security Best Practices

1. **Development:**
   - Use the default credentials above
   - These are safe for local development only

2. **Production:**
   - Never use default passwords
   - Implement password complexity requirements
   - Add password reset functionality
   - Use environment variables for sensitive data
   - Enable rate limiting on login endpoints
   - Implement account lockout after failed attempts




