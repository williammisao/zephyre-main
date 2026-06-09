# 🔥 Firebase + PostgreSQL Setup Guide for Zephyre

This guide will help you set up Firebase Authentication and PostgreSQL database for your Zephyre e-commerce website.

---

## 📋 **PREREQUISITES**

- Node.js installed
- Firebase account (free)
- PostgreSQL database (Supabase, Railway, or Neon recommended)

---

## 🔥 **STEP 1: Create Firebase Project**

### 1.1 Go to Firebase Console
- Visit: https://console.firebase.google.com/
- Click "Add project"
- Enter project name: `zephyre-ecommerce`
- Disable Google Analytics (optional)
- Click "Create project"

### 1.2 Enable Authentication
- In Firebase Console, go to **Build** → **Authentication**
- Click "Get started"
- Enable **Email/Password** sign-in method
- Enable **Google** sign-in method (optional but recommended)

### 1.3 Get Firebase Config (Frontend)
- Go to **Project Settings** (gear icon)
- Scroll down to "Your apps"
- Click **Web** icon (`</>`)
- Register app name: `zephyre-web`
- Copy the `firebaseConfig` object

### 1.4 Get Firebase Admin SDK Credentials (Backend)
- In **Project Settings**, go to **Service accounts** tab
- Click "Generate new private key"
- Download the JSON file (keep it secure!)

---

## 🗄️ **STEP 2: Set Up PostgreSQL Database**

### Option A: Supabase (Recommended - Free Tier)
1. Go to https://supabase.com/
2. Create new project
3. Copy the **Connection String** (PostgreSQL)
4. Format: `postgresql://postgres:[password]@[host]:5432/postgres`

### Option B: Railway
1. Go to https://railway.app/
2. Create new project → Add PostgreSQL
3. Copy the **DATABASE_URL**

### Option C: Neon
1. Go to https://neon.tech/
2. Create new project
3. Copy the **Connection String**

---

## ⚙️ **STEP 3: Configure Environment Variables**

### 3.1 Create `.env` file in project root

```bash
# Copy from .env.example
cp .env.example .env
```

### 3.2 Fill in Firebase Frontend Config (from Step 1.3)

```env
VITE_FIREBASE_API_KEY="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
VITE_FIREBASE_AUTH_DOMAIN="zephyre-ecommerce.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="zephyre-ecommerce"
VITE_FIREBASE_STORAGE_BUCKET="zephyre-ecommerce.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="123456789012"
VITE_FIREBASE_APP_ID="1:123456789012:web:abcdef123456"
```

### 3.3 Fill in Firebase Admin SDK (from Step 1.4 JSON file)

```env
FIREBASE_PROJECT_ID="zephyre-ecommerce"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@zephyre-ecommerce.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQE...\n-----END PRIVATE KEY-----\n"
```

**Important:** Keep the `\n` characters in the private key!

### 3.4 Fill in Database URL (from Step 2)

```env
DATABASE_URL="postgresql://user:password@host:5432/database"
```

---

## 🗃️ **STEP 4: Initialize Database**

### 4.1 Generate Prisma Client

```bash
npx prisma generate
```

### 4.2 Run Database Migrations

```bash
npx prisma migrate dev --name init
```

This will create all tables (User, Product, Order, OrderItem, RunningGroupMember)

### 4.3 (Optional) Seed Initial Data

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create admin user (you'll need to sign up first to get Firebase UID)
  const admin = await prisma.user.create({
    data: {
      firebaseUid: 'YOUR_FIREBASE_UID_HERE', // Get this after signing up
      email: 'admin@zephyre.com',
      name: 'Admin',
      role: 'ADMIN',
    },
  });

  // Create products
  const product = await prisma.product.create({
    data: {
      id: 'trust-tshirt',
      name: 'Trust T-Shirt',
      description: 'Premium heavyweight cotton tee featuring the Trust series design.',
      price: 999.00,
      stock: 100,
      imageUrl: '/images/t-shirts/trust-black-t-shirt.jpeg',
      category: 'MEN',
    },
  });

  console.log('✅ Database seeded!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
```

Run seed:
```bash
npx prisma db seed
```

---

## 🚀 **STEP 5: Run the Application**

### 5.1 Start Development Server

```bash
npm run dev
```

### 5.2 Test Authentication

1. Go to http://localhost:3000
2. Click "Sign Up" or "Login"
3. Create an account with email/password
4. Try Google sign-in

### 5.3 Verify Database

```bash
npx prisma studio
```

This opens a GUI to view your database. Check if:
- User was created in `User` table
- `firebaseUid` is populated

---

## 🔐 **STEP 6: Create Admin User**

### 6.1 Sign up normally through the website

### 6.2 Get your Firebase UID
- Go to Firebase Console → Authentication → Users
- Copy your UID

### 6.3 Update user role in database

```bash
npx prisma studio
```

- Find your user in the `User` table
- Change `role` from `CUSTOMER` to `ADMIN`
- Save

Now you have admin access!

---

## ✅ **STEP 7: Test Everything**

### Test Checklist:

- [ ] Sign up with email/password
- [ ] Sign in with email/password
- [ ] Sign in with Google
- [ ] User appears in PostgreSQL database
- [ ] Register for running group
- [ ] Registration saved in database
- [ ] View account page
- [ ] Logout works

---

## 🐛 **TROUBLESHOOTING**

### Error: "Firebase Admin not configured"
- Check that all `FIREBASE_*` env variables are set
- Restart the server after adding env variables

### Error: "Prisma Client not generated"
```bash
npx prisma generate
```

### Error: "Database connection failed"
- Check `DATABASE_URL` is correct
- Ensure database is running
- Check firewall/network settings

### Error: "User not found in database"
- User might not have been created during signup
- Check server logs for errors
- Manually create user in Prisma Studio

---

## 📚 **NEXT STEPS**

1. **Set up payment gateway** (Razorpay)
2. **Add email service** (SendGrid/Resend)
3. **Build admin dashboard**
4. **Deploy to production**

---

## 🔒 **SECURITY NOTES**

- ✅ Never commit `.env` file to Git
- ✅ Keep Firebase private key secure
- ✅ Use environment variables in production
- ✅ Enable Firebase security rules
- ✅ Use HTTPS in production

---

## 📞 **NEED HELP?**

- Firebase Docs: https://firebase.google.com/docs/auth
- Prisma Docs: https://www.prisma.io/docs
- Supabase Docs: https://supabase.com/docs

---

**You're all set! 🎉**

Your Zephyre website now has:
- ✅ Firebase Authentication
- ✅ PostgreSQL Database
- ✅ User management
- ✅ Running group registration
- ✅ Order system (ready for payment integration)
