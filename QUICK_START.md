# 🚀 Quick Start Guide - Zephyre Authentication

## ⚡ **5-Minute Setup**

### **Step 1: Install Dependencies** (Already Done ✅)
```bash
npm install
```

### **Step 2: Set Up Firebase**

1. **Create Firebase Project:**
   - Go to https://console.firebase.google.com/
   - Click "Add project" → Name it "zephyre"
   - Disable Analytics → Create

2. **Enable Authentication:**
   - Go to Authentication → Get Started
   - Enable "Email/Password"
   - Enable "Google" (optional)

3. **Get Config:**
   - Project Settings → Your apps → Web (`</>`)
   - Copy the config values

4. **Get Admin SDK:**
   - Project Settings → Service Accounts
   - Generate new private key → Download JSON

### **Step 3: Set Up Database**

**Option A: Supabase (Easiest)**
1. Go to https://supabase.com/ → New Project
2. Copy the PostgreSQL connection string
3. Format: `postgresql://postgres:[password]@[host]:5432/postgres`

**Option B: Local PostgreSQL**
```bash
# Install PostgreSQL, then:
createdb zephyre_db
```
Connection string: `postgresql://localhost:5432/zephyre_db`

### **Step 4: Configure Environment**

Create `.env` file:
```env
# Firebase Frontend
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="123456789"
VITE_FIREBASE_APP_ID="1:123456789:web:abc123"

# Firebase Backend (from downloaded JSON)
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Key-Here\n-----END PRIVATE KEY-----\n"

# Database
DATABASE_URL="postgresql://user:password@host:5432/database"
```

### **Step 5: Initialize Database**

```bash
# Generate Prisma Client
npx prisma generate

# Create tables
npx prisma migrate dev --name init
```

### **Step 6: Run the App**

```bash
npm run dev
```

Visit: http://localhost:3000

### **Step 7: Test**

1. Click "Sign Up"
2. Create account
3. Check database: `npx prisma studio`
4. Verify user was created

---

## 🎯 **What You Get**

✅ **User Authentication**
- Email/password signup & login
- Google OAuth login
- Password reset
- Session management

✅ **Database Integration**
- User profiles in PostgreSQL
- Running group registrations saved
- Order system ready

✅ **Admin System**
- Role-based access control
- Admin API endpoints
- Protected routes

✅ **Beautiful UI**
- Login/Signup pages
- Responsive design
- Toast notifications
- Loading states

---

## 🔧 **Common Issues**

**"Firebase Admin not configured"**
→ Check `.env` has all FIREBASE_* variables

**"Database connection failed"**
→ Check DATABASE_URL is correct

**"Prisma Client not generated"**
→ Run `npx prisma generate`

---

## 📚 **Full Documentation**

- **Setup Guide:** `FIREBASE_SETUP_GUIDE.md`
- **Implementation Details:** `AUTHENTICATION_IMPLEMENTATION.md`
- **Project Overview:** `PROJECT_DOCUMENTATION.md`

---

## 🎉 **You're Ready!**

Your authentication system is now live. Next steps:
1. Create admin user (see FIREBASE_SETUP_GUIDE.md)
2. Add payment gateway
3. Build admin dashboard
4. Deploy to production

**Need help?** Check the full guides above!
