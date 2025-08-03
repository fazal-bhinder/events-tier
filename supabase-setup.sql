-- Create the events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  image_url TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('free', 'silver', 'gold', 'platinum')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for tier-based access
CREATE POLICY "Tier-based access" ON events
  FOR SELECT USING (
    CASE 
      WHEN tier = 'free' THEN true
      WHEN tier = 'silver' THEN auth.jwt() ->> 'tier' IN ('silver', 'gold', 'platinum')
      WHEN tier = 'gold' THEN auth.jwt() ->> 'tier' IN ('gold', 'platinum')
      WHEN tier = 'platinum' THEN auth.jwt() ->> 'tier' = 'platinum'
      ELSE false
    END
  );

-- Insert sample events
INSERT INTO events (title, description, event_date, image_url, tier) VALUES
-- Free Tier Events
(
  'Community Meetup',
  'Join us for a casual community meetup where you can network with fellow enthusiasts and share your experiences.',
  '2024-02-15 18:00:00+00',
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop',
  'free'
),
(
  'Introduction to Web Development',
  'Learn the basics of web development in this beginner-friendly workshop. No prior experience required.',
  '2024-02-20 14:00:00+00',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
  'free'
),

-- Silver Tier Events
(
  'Advanced JavaScript Workshop',
  'Deep dive into advanced JavaScript concepts including ES6+, async/await, and modern patterns.',
  '2024-02-25 10:00:00+00',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
  'silver'
),
(
  'UI/UX Design Principles',
  'Master the fundamentals of user interface and user experience design with hands-on projects.',
  '2024-03-01 15:00:00+00',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
  'silver'
),

-- Gold Tier Events
(
  'Full-Stack Development Bootcamp',
  'Comprehensive bootcamp covering frontend, backend, and database development with real-world projects.',
  '2024-03-05 09:00:00+00',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
  'gold'
),
(
  'Cloud Architecture Workshop',
  'Learn to design and deploy scalable applications using modern cloud technologies.',
  '2024-03-10 13:00:00+00',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
  'gold'
),

-- Platinum Tier Events
(
  'AI/ML Masterclass',
  'Exclusive workshop on artificial intelligence and machine learning with industry experts.',
  '2024-03-15 11:00:00+00',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
  'platinum'
),
(
  'Tech Leadership Summit',
  'Join industry leaders for an exclusive summit on technology leadership and innovation.',
  '2024-03-20 16:00:00+00',
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop',
  'platinum'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_tier ON events(tier);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date); 