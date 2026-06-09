# Database Setup Instructions

## Current Status
The username feature has been implemented in the code, but requires PostgreSQL database setup to work fully.

## What Has Been Completed ✅

### Frontend Changes
- ✅ Added username input field in Account Page edit form
- ✅ Username displayed as `@username` in profile header
- ✅ Username validation (lowercase, numbers, underscores only, min 3 chars)
- ✅ Auto-generates username from display name as fallback
- ✅ Added useEffect to fetch user data from database on component mount
- ✅ Profile updates now include username

### Backend Changes
- ✅ Added username field to Prisma User model (`schema.prisma`)
- ✅ Created `/api/users/update` endpoint to update user profile
- ✅ Username uniqueness validation in backend
- ✅ Modified `/api/users/me` endpoint to return username

### Database Schema
The Prisma schema now includes:
```prisma
model User {
  id            String    @id @default(uuid())
  firebaseUid   String    @unique
  email         String    @unique
  name          String?
  username      String?   @unique  // New field
  phoneNumber   String?
  photoURL      String?
  orders        Order[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  role          Role      @default(CUSTOMER)
}
```

## What Needs to Be Done ⚠️

### 1. Install PostgreSQL (Required)

**Option A: PostgreSQL Installer (Recommended)**
1. Download from: https://www.postgresql.org/download/windows/
2. Run the installer (choose version 16.x)
3. During installation:
   - Components: Select all (PostgreSQL Server, pgAdmin 4, Command Line Tools)
   - Port: Keep default **5432**
   - Password: Create and remember a strong password
   - Complete installation

**Option B: Via Chocolatey**
```powershell
choco install postgresql
```

### 2. Configure Database Connection

After PostgreSQL is installed, update your `.env` file:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/zephyre_db"
```

Replace `YOUR_PASSWORD` with the password you set during PostgreSQL installation.

### 3. Run Database Migration

Once PostgreSQL is running, execute:

```bash
# Create the database and apply migrations
npx prisma migrate dev --name add_username_to_user

# Generate Prisma Client
npx prisma generate
```

### 4. Restart the Server

```bash
npm run dev
```

## Testing the Username Feature

After database setup:

1. **Sign in** to your account
2. Go to **Account Page**
3. Click **Edit Profile**
4. You should see:
   - Username field (with @ symbol prefix)
   - Full Name field
   - Phone Number field
5. Enter a username (lowercase, numbers, underscores)
6. Click **Save Changes**
7. Your profile header should display `@your_username`

## API Endpoints

### Get User Profile
```
GET /api/users/me
Authorization: Bearer {firebase_token}
```

Returns user data including username.

### Update User Profile
```
PUT /api/users/update
Authorization: Bearer {firebase_token}
Content-Type: application/json

{
  "name": "Full Name",
  "username": "my_username",
  "phone": "+1234567890"
}
```

## Error Handling

The system handles:
- ✅ Duplicate username detection
- ✅ Invalid username characters (auto-converts to valid format)
- ✅ Minimum length validation (3 characters)
- ✅ Fallback to display name if username not set
- ✅ Case conversion (forces lowercase)

## Migration SQL (Preview)

When you run the migration, it will execute:

```sql
ALTER TABLE "User" ADD COLUMN "username" TEXT;
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
```

This adds the username column and ensures usernames are unique across all users.

## Next Steps After Database Setup

1. **Test user registration** - Ensure new users are created in database
2. **Test username updates** - Verify users can set and change usernames
3. **Test uniqueness** - Try setting a username that already exists
4. **Check Navbar** - Optionally update Navbar to show username instead of first name

## Current Workaround (Without Database)

The app will still work without PostgreSQL, but:
- Username will be auto-generated from display name
- Username changes won't persist
- Order history won't be saved
- Running club registrations won't be saved

The Firebase authentication will continue to work normally.
