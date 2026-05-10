# Authentication Setup Guide

This document explains how the authentication system works in Edusanna and how to configure it.

## Overview

The authentication system is built on:
- **Supabase Auth** - For user registration and login
- **NextAuth.js** - For session management
- **Supabase Profiles Table** - For storing user data and admin roles

## Architecture

### Key Components

1. **Supabase Auth** - Handles user credentials securely
2. **Profiles Table** - Stores user information (name, country, admin status)
3. **NextAuth Session** - Manages user sessions across the app
4. **API Routes** - `/api/auth/signin` and `/api/auth/signup` for authentication

### Authentication Flow

#### Sign Up
1. User fills form on `/signup` page
2. Form data sent to `/api/auth/signup` endpoint
3. Endpoint creates Supabase auth user and profile record
4. User redirected to `/dashboard`

#### Sign In
1. User enters email/password on `/login` page
2. Credentials sent to `/api/auth/signin` endpoint
3. Endpoint authenticates with Supabase Auth
4. Endpoint checks if user is admin (via profiles table)
5. Returns session token and redirects based on role

#### Dashboard/Admin Access
- Protected pages check `useSession()` hook
- If no session → redirected to `/login`
- Admin page additionally checks admin status

## Environment Variables

### Required Variables

Create a `.env.local` file with these variables:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# NextAuth
NEXTAUTH_URL=http://localhost:3000 (or your production URL)
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# Optional: Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Optional: Admin codes
NEXT_PUBLIC_ADMIN_CODE_1=Activate
NEXT_PUBLIC_ADMIN_CODE_2=Bankai
```

### How to Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

Or use an online generator: https://generate-secret.vercel.app/32

## Database Setup

### 1. Run Migration Scripts

The schema is defined in `scripts/001_edusanna_schema.sql`. To apply it:

```bash
# Using Supabase CLI
supabase db push

# Or manually in Supabase SQL Editor
# Copy contents of scripts/001_edusanna_schema.sql
# Execute in your Supabase project
```

### 2. Key Tables

- **auth.users** - Supabase built-in auth table
- **profiles** - User information (id, email, full_name, country, city, is_admin)
- **enrollments** - Course enrollment records
- **courses** - Course data
- **completion_notifications** - Completion alerts for admins

### 3. Row Level Security (RLS)

All tables have RLS enabled. Users can only:
- View their own profile
- View their own enrollments
- Create new enrollments

Admins can:
- View all data
- Manage courses
- View completion notifications

## Making Admin Users

### Option 1: Direct Database Update

```sql
UPDATE profiles 
SET is_admin = TRUE 
WHERE email = 'africanedusanna@gmail.com';
```

### Option 2: Using Secret Codes

For added security, you can require secret codes. Users need to provide both codes during signup:

1. Code 1 defaults to "Activate"
2. Code 2 defaults to "Bankai"

To change these, update `NEXT_PUBLIC_ADMIN_CODE_1` and `NEXT_PUBLIC_ADMIN_CODE_2` environment variables.

## Testing Authentication

### Test User Registration

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!",
    "fullName": "Test User",
    "mobileNumber": "+1234567890",
    "country": "USA",
    "city": "New York"
  }'
```

### Test User Login

```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!"
  }'
```

## Security Considerations

### Password Security

- Passwords are hashed by Supabase Auth
- Never store plain text passwords
- Minimum password requirements enforced by Supabase

### Session Security

- Sessions use JWT tokens via NextAuth
- Tokens are httpOnly cookies (cannot be accessed by JavaScript)
- Sessions auto-refresh
- Max age: 30 days

### Admin Access

- Admin status stored in database
- Checked on every admin page access
- Can be revoked immediately by updating database

## Troubleshooting

### "Missing environment variables"

Ensure `.env.local` has all required variables. Check:
```bash
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXTAUTH_URL
echo $NEXTAUTH_SECRET
```

### "Authentication failed"

1. Check Supabase URL and keys are correct
2. Verify user exists in Supabase auth
3. Check password is correct
4. Review browser console for error messages

### "Admin access denied"

1. Check user record in profiles table
2. Verify `is_admin` column is TRUE
3. Restart dev server after changing admin status
4. Clear browser cookies and re-login

## Script Files

### fix-nested-quotes.js

Automatically fixes syntax errors in course data files:
```bash
npm run fix-quotes
```

Run before build to ensure all course data is valid.

## API Endpoints

### POST /api/auth/signin

Sign in with email/password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "email": "user@example.com"
  },
  "isAdmin": false
}
```

### POST /api/auth/signup

Register new user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password",
  "fullName": "User Name",
  "mobileNumber": "+1234567890",
  "country": "USA",
  "city": "New York"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "email": "user@example.com"
  }
}
```

## Next Steps

1. Set up Supabase project and get credentials
2. Create `.env.local` with environment variables
3. Run database migration scripts
4. Test authentication flow
5. Create admin user
6. Deploy to production

## Support

For Supabase issues: https://supabase.com/docs
For NextAuth issues: https://next-auth.js.org/
For app-specific issues: Check console logs and error messages
