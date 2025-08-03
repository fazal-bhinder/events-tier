import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { EventsList } from '@/components/events-list'
import { motion } from 'framer-motion'
import { Crown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getTierColor } from '@/lib/utils'

export default async function EventsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Events Showcase
          </h1>
          <p className="text-gray-600 mb-4">
            Discover events tailored to your membership tier
          </p>
        <EventsList />
      </div>
    </div>
  )
} 