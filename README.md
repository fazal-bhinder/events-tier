# Tier-Based Event Showcase

A responsive and elegant web application that allows logged-in users to view a list of show events based on their user tier (Free, Silver, Gold, Platinum). Users can only see events available to their tier or any lower tier.

## 🚀 Features

- **Authentication**: Secure login/signup with Clerk.dev
- **Tier-Based Access**: Users only see events matching their tier or below
- **Beautiful UI**: Modern, responsive design with Tailwind CSS and shadcn/ui
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Tier Upgrades**: Simulate tier upgrades using Clerk metadata
- **Row-Level Security**: Supabase RLS for database-level security
- **Loading States**: Proper loading and error handling
- **Mobile Responsive**: Works perfectly on all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Authentication**: Clerk.dev
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📋 Requirements

### 1. Authentication

- ✅ Clerk.dev integration for login and signup
- ✅ Restricted event listing to authenticated users
- ✅ User tier stored in Clerk metadata

### 2. Event Data (Supabase)

- ✅ Events table with proper schema
- ✅ 8 sample events (2 per tier)
- ✅ Tier-based filtering

### 3. Tier-Based Filtering

- ✅ Fetch events from Supabase
- ✅ Show only accessible events based on user tier
- ✅ Example: Gold users see Free, Silver, and Gold events

### 4. Frontend UI

- ✅ Clean, responsive design with Tailwind CSS
- ✅ Event cards with title, description, date, tier badge, and image
- ✅ Color-coded tier badges
- ✅ Beautiful animations

## ⚡ Bonus Features Implemented

- ✅ Loading states and error handling
- ✅ Upgrade messages for higher tier events
- ✅ Tier upgrade simulation with Clerk metadata
- ✅ Supabase Row-Level Security (RLS)
- ✅ Smooth animations and transitions
- ✅ Mobile-responsive design

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Clerk.dev account
- Supabase account

### 1. Clone the Repository

```bash
git clone <repository-url>
cd tier-based-event-showcase
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

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

### 4. Set Up Clerk.dev

1. Create a new application in Clerk.dev
2. Configure your sign-in and sign-up URLs
3. Add your domain to allowed origins
4. Copy your publishable and secret keys to `.env.local`

### 5. Set Up Supabase

1. Create a new project in Supabase
2. Go to the SQL Editor
3. Run the SQL script from `supabase-setup.sql`
4. Copy your project URL and anon key to `.env.local`

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 👥 Demo User Credentials

For testing purposes, you can create users with different tiers:

### Free Tier User

- Email: `free@example.com`
- Password: `password123`
- Tier: `free` (default)

### Silver Tier User

- Email: `silver@example.com`
- Password: `password123`
- Tier: `silver`

### Gold Tier User

- Email: `gold@example.com`
- Password: `password123`
- Tier: `gold`

### Platinum Tier User

- Email: `platinum@example.com`
- Password: `password123`
- Tier: `platinum`

## 🎯 How to Test Tier Upgrades

1. Sign in with any user account
2. Navigate to `/upgrade` or click the "Upgrade" button
3. Click "Upgrade" on any tier higher than your current tier
4. The page will refresh and show your new tier
5. Navigate back to `/events` to see additional events

## 📊 Database Schema

```sql
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  image_url TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('free', 'silver', 'gold', 'platinum')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔒 Security Features

- **Row-Level Security (RLS)**: Database-level access control
- **Tier-based filtering**: Server-side and client-side validation
- **Authentication required**: All protected routes require login
- **Metadata validation**: Clerk metadata for tier management

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion for delightful interactions
- **Loading States**: Proper feedback during data fetching
- **Error Handling**: Graceful error messages
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Dark Mode Ready**: CSS variables for easy theming

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to add all environment variables to your Vercel project settings.

## 📝 Project Structure

```
├── app/
│   ├── events/
│   │   └── page.tsx          # Main events page
│   ├── sign-in/
│   │   └── [[...sign-in]]/
│   │       └── page.tsx      # Sign-in page
│   ├── sign-up/
│   │   └── [[...sign-up]]/
│   │       └── page.tsx      # Sign-up page
│   ├── upgrade/
│   │   └── page.tsx          # Tier upgrade page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── navigation.tsx        # Navigation component
│   └── tier-upgrade.tsx      # Tier upgrade component
├── lib/
│   ├── supabase.ts           # Supabase client
│   └── utils.ts              # Utility functions
├── supabase-setup.sql        # Database setup script
└── README.md                 # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include your environment details and error messages

## 🎉 Acknowledgments

- [Clerk.dev](https://clerk.dev) for authentication
- [Supabase](https://supabase.com) for database
- [shadcn/ui](https://ui.shadcn.com) for UI components
- [Framer Motion](https://framer.com/motion) for animations
- [Tailwind CSS](https://tailwindcss.com) for styling

---

**Happy coding! 🚀**
