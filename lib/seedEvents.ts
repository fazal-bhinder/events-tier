// scripts/seedEvents.ts
import { supabase, Event } from '../lib/supabase'

type EventInsert = Omit<Event, 'id' | 'created_at'>

const eventsData: EventInsert[] = [
  {
    title: 'React Fundamentals Workshop',
    description: 'Learn the basics of React with hands-on coding exercises. Perfect for beginners who want to understand components, state, and props.',
    event_date: '2025-08-15T10:00:00Z',
    image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    tier: 'free'
  },
  {
    title: 'Advanced JavaScript Patterns',
    description: 'Deep dive into advanced JavaScript concepts including closures, prototypes, async/await, and modern ES6+ features.',
    event_date: '2025-08-20T14:00:00Z',
    image_url: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop',
    tier: 'free'
  },
  {
    title: 'CSS Grid & Flexbox Mastery',
    description: 'Master modern CSS layout techniques with hands-on practice and real-world examples.',
    event_date: '2025-08-22T16:00:00Z',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    tier: 'free'
  },
  {
    title: 'Git & GitHub Best Practices',
    description: 'Learn version control, branching strategies, and collaborative development workflows.',
    event_date: '2025-08-28T11:00:00Z',
    image_url: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop',
    tier: 'free'
  },
  {
    title: 'Node.js Backend Development',
    description: 'Build scalable backend applications with Node.js, Express, and MongoDB. Includes authentication and API design.',
    event_date: '2025-08-25T09:00:00Z',
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    tier: 'silver'
  },
  {
    title: 'Full-Stack Next.js Masterclass',
    description: 'Complete guide to building full-stack applications with Next.js 14, including App Router, Server Components, and deployment.',
    event_date: '2025-09-01T11:00:00Z',
    image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    tier: 'silver'
  },
  {
    title: 'Mobile App Development with React Native',
    description: 'Create cross-platform mobile applications using React Native, including navigation, state management, and native modules.',
    event_date: '2025-10-05T11:30:00Z',
    image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    tier: 'silver'
  },
  {
    title: 'Database Design & Optimization',
    description: 'Master database design principles, SQL optimization, indexing strategies, and performance tuning techniques.',
    event_date: '2025-09-05T13:00:00Z',
    image_url: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop',
    tier: 'gold'
  },
  {
    title: 'Cloud Architecture with AWS',
    description: 'Design and deploy scalable cloud applications using AWS services including EC2, S3, RDS, and Lambda.',
    event_date: '2025-09-10T10:30:00Z',
    image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    tier: 'gold'
  },
  {
    title: 'DevOps & CI/CD Pipeline Setup',
    description: 'Learn to set up automated deployment pipelines using Docker, GitHub Actions, and cloud platforms.',
    event_date: '2025-09-15T15:00:00Z',
    image_url: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=600&fit=crop',
    tier: 'gold'
  },
  {
    title: 'GraphQL API Development',
    description: 'Build efficient APIs with GraphQL, including schema design, resolvers, subscriptions, and performance optimization.',
    event_date: '2025-10-15T13:30:00Z',
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    tier: 'gold'
  },
  {
    title: 'AI/ML Integration Workshop',
    description: 'Integrate artificial intelligence and machine learning into web applications using TensorFlow.js and OpenAI APIs.',
    event_date: '2025-09-20T12:00:00Z',
    image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
    tier: 'platinum'
  },
  {
    title: 'Blockchain Development Bootcamp',
    description: 'Build decentralized applications (DApps) using Ethereum, Solidity, and Web3.js technologies.',
    event_date: '2025-09-25T09:30:00Z',
    image_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
    tier: 'platinum'
  },
  {
    title: 'Microservices Architecture Design',
    description: 'Design and implement microservices architecture with Docker, Kubernetes, and service mesh technologies.',
    event_date: '2025-09-30T14:30:00Z',
    image_url: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop',
    tier: 'platinum'
  },
  {
    title: 'Cybersecurity for Developers',
    description: 'Essential security practices for web developers including OWASP Top 10, authentication, and vulnerability assessment.',
    event_date: '2025-10-20T16:00:00Z',
    image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    tier: 'platinum'
  }
]

interface TierCount {
  [key: string]: number
}

async function seedEvents(): Promise<void> {
  console.log('🌱 Starting to seed events...')
  
  try {
    // First, let's check if events already exist
    const { data: existingEvents, error: checkError } = await supabase
      .from('events')
      .select('id')
      .limit(1)

    if (checkError) {
      console.error('❌ Error checking existing events:', checkError.message)
      return
    }

    if (existingEvents && existingEvents.length > 0) {
      console.log('⚠️  Events already exist. Do you want to clear them first?')
      console.log('   Run: DELETE FROM events; in your Supabase SQL editor if you want to start fresh.')
      return
    }

    // Insert the events
    const { data, error } = await supabase
      .from('events')
      .insert(eventsData)
      .select()

    if (error) {
      console.error('❌ Error inserting events:', error.message)
      console.error('Full error:', error)
      return
    }

    console.log(`✅ Successfully inserted ${data?.length || 0} events!`)
    
    // Show summary by tier
    const tierCounts: TierCount = eventsData.reduce((acc: TierCount, event) => {
      acc[event.tier] = (acc[event.tier] || 0) + 1
      return acc
    }, {})

    console.log('\n📊 Events by tier:')
    Object.entries(tierCounts).forEach(([tier, count]) => {
      console.log(`   ${tier}: ${count} events`)
    })

    console.log('\n🎉 Seeding completed successfully!')
    
  } catch (err) {
    console.error('💥 Unexpected error:', err)
  }
}

// Run the seeding function
seedEvents().catch(console.error)