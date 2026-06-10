# Zephyre Application Architecture

## System Overview

Zephyre is a full-stack e-commerce application built with React (Vite), Express.js, PostgreSQL, and Firebase Authentication.

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  React + Vite + TypeScript + TailwindCSS + Motion           │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                   AUTHENTICATION LAYER                       │
│              Firebase Auth (Frontend + Backend)              │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                       │
│              Express.js Server + API Endpoints               │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                       DATABASE LAYER                         │
│           PostgreSQL + Prisma ORM + Migrations               │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend
- **Framework**: React 18 (with Vite)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **State Management**: 
  - Zustand (Cart)
  - React Context (Auth)
- **Form Handling**: React Hooks
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js v25
- **Framework**: Express.js
- **Language**: TypeScript (TSX runtime)
- **ORM**: Prisma
- **Database**: PostgreSQL 18

### Authentication
- **Provider**: Firebase Auth
- **Methods**: 
  - Email/Password
  - Google OAuth
- **Implementation**: Firebase SDK (Frontend) + Firebase Admin SDK (Backend)

### Database
- **Database**: PostgreSQL 18
- **ORM**: Prisma v5.22.0
- **Migrations**: Prisma Migrate
- **Connection**: Direct connection via connection string

---

## Project Structure

```
zephyre-main/
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── migrations/                # Database migrations
├── public/
│   └── images/                    # Static assets
├── src/
│   ├── components/                # React components
│   │   ├── AccountPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   ├── ShopView.tsx
│   │   ├── ProductDetailView.tsx
│   │   ├── RunningGroup.tsx
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Ethos.tsx
│   │   └── ... (other components)
│   ├── contexts/
│   │   └── AuthContext.tsx        # Authentication context
│   ├── store/
│   │   └── useCartStore.ts        # Cart state management
│   ├── lib/
│   │   ├── firebase.ts            # Firebase config
│   │   └── utils.ts               # Utility functions
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles
├── server.ts                      # Express server
├── .env                           # Environment variables
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript config
└── package.json                   # Dependencies

```

---

## Data Flow Architecture

### 1. User Authentication Flow

```
User Action (Login/Signup)
         ↓
AuthContext.tsx (Frontend)
         ↓
Firebase Auth SDK
         ↓
Firebase Backend
         ↓
[Success] → Get ID Token
         ↓
Send to Backend (/api/users/create)
         ↓
Express Server (server.ts)
         ↓
Verify Token (Firebase Admin SDK)
         ↓
Prisma Client
         ↓
PostgreSQL Database (User table)
         ↓
Return User Data → Frontend
         ↓
Update AuthContext State
         ↓
Render Protected Routes
```

### 2. Profile Update Flow

```
User edits profile
         ↓
AccountPage.tsx (handleProfileUpdate)
         ↓
Update Firebase Profile (displayName)
         ↓
Get ID Token
         ↓
API Call: PUT /api/users/update
         ↓
Express Middleware (authenticateUser)
         ↓
Verify Firebase Token
         ↓
Check Username Uniqueness (Prisma)
         ↓
Update User in PostgreSQL
         ↓
Return Updated User Data
         ↓
Update Local State (setDbUser)
         ↓
Show Success Toast
```

### 3. Shopping Cart Flow

```
User adds item to cart
         ↓
useCartStore.ts (Zustand)
         ↓
addItem() action
         ↓
Update cart state (in-memory)
         ↓
Persist to localStorage (optional)
         ↓
Update cart count in Navbar
         ↓
User proceeds to checkout
         ↓
CheckoutPage.tsx
         ↓
Collect shipping info
         ↓
API Call: POST /api/orders/create
         ↓
Authenticate user
         ↓
Create Order in PostgreSQL
         ↓
Create OrderItems (linked to Order)
         ↓
Return Order confirmation
         ↓
Clear cart
         ↓
Redirect to success page
```

### 4. Running Club Registration Flow

```
User fills registration form
         ↓
RunningGroup.tsx (handleSubmit)
         ↓
API Call: POST /api/running-group/register
         ↓
Express Server
         ↓
Validate email uniqueness
         ↓
Create RunningGroupMember in PostgreSQL
         ↓
Return success response
         ↓
Show success message
         ↓
Update UI (isRegistered = true)
```

---

## Database Schema

### User Table
```prisma
model User {
  id            String    @id @default(uuid())
  firebaseUid   String    @unique
  email         String    @unique
  name          String?
  username      String?   @unique
  phoneNumber   String?
  photoURL      String?
  orders        Order[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  role          Role      @default(CUSTOMER)
}
```

### Product Table
```prisma
model Product {
  id          String      @id @default(uuid())
  name        String
  description String
  price       Decimal     @db.Decimal(10, 2)
  stock       Int         @default(0)
  imageUrl    String?
  category    Category    @default(MEN)
  items       OrderItem[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}
```

### Order Table
```prisma
model Order {
  id          String      @id @default(uuid())
  userId      String?
  user        User?       @relation(fields: [userId], references: [id])
  status      OrderStatus @default(PENDING)
  totalAmount Decimal     @db.Decimal(10, 2)
  items       OrderItem[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}
```

### OrderItem Table
```prisma
model OrderItem {
  id        String   @id @default(uuid())
  orderId   String
  order     Order    @relation(fields: [orderId], references: [id])
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  quantity  Int
  price     Decimal  @db.Decimal(10, 2)
}
```

### RunningGroupMember Table
```prisma
model RunningGroupMember {
  id          String   @id @default(uuid())
  firstName   String
  lastName    String
  email       String   @unique
  phone       String
  experience  String
  goals       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## API Endpoints

### User Management

#### POST /api/users/create
**Auth**: Required (Firebase Token)
**Purpose**: Create user in database after Firebase signup
```json
{
  "firebaseUid": "string",
  "email": "string",
  "name": "string",
  "photoURL": "string"
}
```

#### GET /api/users/me
**Auth**: Required
**Purpose**: Get current user profile with orders
```json
{
  "id": "uuid",
  "email": "string",
  "name": "string",
  "username": "string",
  "phoneNumber": "string",
  "photoURL": "string",
  "orders": []
}
```

#### PUT /api/users/update
**Auth**: Required
**Purpose**: Update user profile (username, name, phone)
```json
{
  "name": "string",
  "username": "string",
  "phone": "string"
}
```

### Product Management

#### GET /api/products
**Auth**: None
**Purpose**: Get all products
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": number,
    "imageUrl": "string",
    "category": "string"
  }
]
```

#### GET /api/products/:id
**Auth**: None
**Purpose**: Get product by ID

### Order Management

#### POST /api/orders/create
**Auth**: Required
**Purpose**: Create new order
```json
{
  "items": [
    {
      "productId": "uuid",
      "quantity": number,
      "price": number
    }
  ],
  "shippingAddress": "string",
  "totalAmount": number,
  "paymentId": "string"
}
```

#### GET /api/orders/my-orders
**Auth**: Required
**Purpose**: Get user's order history

### Running Club

#### POST /api/running-group/register
**Auth**: None
**Purpose**: Register for running club
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "experience": "beginner|intermediate|advanced",
  "goals": "string"
}
```

---

## Component Hierarchy

```
App.tsx
├── Navbar.tsx
│   ├── Logo
│   ├── Navigation Links
│   ├── Cart Icon (onClick: opens CartSidebar)
│   └── User Profile / Login
│
├── Router (React Router)
│   ├── / (Home)
│   │   ├── Hero.tsx
│   │   ├── CategoryShowcase.tsx
│   │   ├── FeaturedSection.tsx
│   │   ├── BrandStory.tsx
│   │   ├── StatsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── NewsletterSection.tsx
│   │
│   ├── /shop (ShopView)
│   │   └── ProductCard.tsx (multiple)
│   │
│   ├── /product/:id (ProductDetailView)
│   │   ├── Product Images
│   │   ├── Product Info
│   │   ├── Size Selector
│   │   └── Add to Cart Button
│   │
│   ├── /ethos (Ethos)
│   │   └── FlowArt.tsx
│   │       └── FlowSection.tsx (multiple)
│   │
│   ├── /space (RunningGroup)
│   │   ├── Club Info
│   │   └── Registration Form
│   │
│   ├── /login (LoginPage)
│   │   ├── Email/Password Form
│   │   └── Google OAuth Button
│   │
│   ├── /signup (SignupPage)
│   │   ├── Registration Form
│   │   └── Google OAuth Button
│   │
│   ├── /account (AccountPage) [Protected]
│   │   ├── Profile Tab
│   │   ├── Orders Tab
│   │   ├── Wishlist Tab
│   │   └── Settings Tab
│   │
│   └── /checkout (CheckoutPage) [Protected]
│       ├── Shipping Form
│       ├── Order Summary
│       └── Payment Info
│
├── CartSidebar.tsx (Global)
│   ├── Cart Items List
│   ├── Total Calculation
│   └── Checkout Button
│
└── CustomCursor.tsx (Global)
```

---

## State Management

### 1. Global State (Zustand)

#### Cart Store (`useCartStore.ts`)
```typescript
interface CartState {
  items: CartItem[]
  addItem: (product, quantity, size, variant) => void
  removeItem: (productId) => void
  updateQuantity: (productId, quantity) => void
  clearCart: () => void
}
```

### 2. Context State (React Context)

#### Auth Context (`AuthContext.tsx`)
```typescript
interface AuthContextType {
  currentUser: User | null
  loading: boolean
  signup: (email, password, name) => Promise<void>
  login: (email, password) => Promise<void>
  logout: () => Promise<void>
  loginWithGoogle: () => Promise<void>
  resetPassword: (email) => Promise<void>
  getIdToken: () => Promise<string | null>
}
```

### 3. Local Component State
- Form data (useState)
- Loading states (useState)
- Modal/sidebar visibility (useState)
- Tab selection (useState)

---

## Authentication Pipeline

### Sign Up Process
```
1. User fills signup form (SignupPage.tsx)
2. Call AuthContext.signup(email, password, name)
3. Firebase createUserWithEmailAndPassword()
4. Update Firebase profile with displayName
5. Get Firebase ID token
6. POST /api/users/create with token
7. Backend verifies token (Firebase Admin SDK)
8. Create user in PostgreSQL (Prisma)
9. Return user data
10. Navigate to home page
11. Show success toast
```

### Login Process
```
1. User fills login form (LoginPage.tsx)
2. Call AuthContext.login(email, password)
3. Firebase signInWithEmailAndPassword()
4. Get Firebase ID token
5. Store in AuthContext
6. Navigate to intended page
7. Show success toast
```

### Google OAuth Process
```
1. User clicks "Continue with Google"
2. Call AuthContext.loginWithGoogle()
3. Firebase signInWithPopup(GoogleAuthProvider)
4. Get user data from Google
5. Get Firebase ID token
6. POST /api/users/create (upsert)
7. Backend creates/updates user in PostgreSQL
8. Navigate to home page
9. Show success toast
```

### Protected Route Access
```
1. User tries to access /account or /checkout
2. App.tsx checks currentUser from AuthContext
3. If null → Redirect to /login
4. If exists → Render protected component
5. Component makes authenticated API calls with token
```

---

## Deployment Architecture

### Development Environment
```
Frontend: Vite Dev Server (localhost:5173)
Backend: Express Server (localhost:3000)
Database: PostgreSQL (localhost:5432)
```

### Production Environment (Recommended)
```
Frontend: Vercel / Netlify (Static hosting)
Backend: Railway / Render / Heroku (Node.js hosting)
Database: Railway PostgreSQL / Supabase / AWS RDS
Firebase: Firebase Cloud (Authentication)
```

---

## Environment Variables

```env
# Frontend (Vite - prefixed with VITE_)
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID

# Backend
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
DATABASE_URL
NODE_ENV
APP_URL
```

---

## Security Measures

### 1. Authentication
- ✅ Firebase Auth with secure tokens
- ✅ Token verification on every protected endpoint
- ✅ Admin SDK for backend verification
- ✅ Automatic token refresh

### 2. Database
- ✅ Prisma ORM (prevents SQL injection)
- ✅ Parameterized queries
- ✅ Unique constraints (email, username, firebaseUid)
- ✅ Password stored in Firebase (not in database)

### 3. API Security
- ✅ CORS configuration
- ✅ Authentication middleware
- ✅ Role-based access control (ADMIN/CUSTOMER)
- ✅ Input validation

### 4. Frontend
- ✅ Environment variables (not in bundle)
- ✅ Protected routes (redirect if not authenticated)
- ✅ HTTPS in production
- ✅ Secure cookie handling (Firebase)

---

## Performance Optimizations

### Frontend
- ✅ Code splitting (React Router lazy loading)
- ✅ Image optimization (WebP format)
- ✅ Lazy loading components
- ✅ Zustand for lightweight state management
- ✅ Memoization (React.memo, useMemo, useCallback)

### Backend
- ✅ Database indexing (unique fields)
- ✅ Connection pooling (Prisma)
- ✅ Efficient queries (Prisma select/include)
- ✅ Error handling and logging

### Database
- ✅ Indexes on foreign keys
- ✅ Unique constraints for fast lookups
- ✅ Proper data types (UUID, Decimal, DateTime)

---

## Error Handling

### Frontend
```typescript
try {
  // API call or operation
} catch (error: any) {
  toast.error(error.message || 'Operation failed')
  console.error('Error details:', error)
}
```

### Backend
```typescript
try {
  // Database operation
} catch (error: any) {
  console.error('Error:', error)
  res.status(500).json({ 
    error: 'Operation failed', 
    details: error.message 
  })
}
```

---

## Monitoring & Logging

### Current Implementation
- Console.log for development
- Firebase Auth logs
- Prisma query logs
- React Hot Toast for user feedback

### Recommended for Production
- Sentry (Error tracking)
- LogRocket (Session replay)
- Firebase Analytics
- Database query monitoring

---

## Future Enhancements

### Planned Features
- Payment integration (Stripe/Razorpay)
- Order tracking system
- Email notifications (SendGrid)
- Admin dashboard
- Product reviews
- Wishlist persistence
- Advanced filtering
- User tier/badge system
- Product recommendations

### Technical Improvements
- Redis caching
- CDN for images
- GraphQL API
- Mobile app (React Native)
- PWA support
- Automated testing (Jest, Cypress)
- CI/CD pipeline (GitHub Actions)

---

## Maintenance & Updates

### Regular Tasks
- Database backups
- Security updates
- Dependency updates
- Performance monitoring
- User feedback review

### Update Strategy
1. Test in development
2. Run migrations (Prisma)
3. Update dependencies
4. Deploy to staging
5. Test thoroughly
6. Deploy to production
7. Monitor for issues

---

## Support & Documentation

- **Technical Documentation**: This file
- **API Documentation**: See API Endpoints section
- **Database Schema**: prisma/schema.prisma
- **Setup Guide**: DATABASE_SETUP_INSTRUCTIONS.md
- **Authentication Guide**: AUTHENTICATION_IMPLEMENTATION.md
- **Quick Start**: QUICK_START.md

---

**Last Updated**: June 10, 2026
**Version**: 1.0.0
**Maintained By**: Zephyre Team
