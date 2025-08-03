# Deployment Guide

## Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/events
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/events

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Clerk.dev Setup

1. Go to [Clerk.dev](https://clerk.dev) and create an account
2. Create a new application
3. Go to API Keys in the dashboard
4. Copy your Publishable Key and Secret Key
5. Add your domain to allowed origins (for production)
6. Update the environment variables

## Supabase Setup

1. Go to [Supabase](https://supabase.com) and create an account
2. Create a new project
3. Go to Settings > API to get your project URL and anon key
4. Go to SQL Editor and run the `supabase-setup.sql` script
5. Update the environment variables

## Vercel Deployment

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and create an account
3. Import your GitHub repository
4. Add all environment variables in the Vercel dashboard
5. Deploy!

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
