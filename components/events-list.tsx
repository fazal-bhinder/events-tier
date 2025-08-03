'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from '@/lib/supabase'
import { Event } from '@/lib/supabase'
import { Tier, canAccessTier, getTierColor, formatDate } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LoadingSkeleton, LoadingSpinner } from '@/components/ui/loading'
import { motion } from 'framer-motion'
import { Crown, Calendar, Lock, AlertCircle, RefreshCw } from 'lucide-react'
import Image from 'next/image'

export function EventsList() {
  const { user } = useUser()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userTier, setUserTier] = useState<Tier>('free')
  const [retrying, setRetrying] = useState(false)

  useEffect(() => {
    const tier = (user?.unsafeMetadata?.tier as Tier) || 'free'
    setUserTier(tier)
  }, [user])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error: supabaseError } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true })

      if (supabaseError) {
        throw new Error(supabaseError.message)
      }

      setEvents(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch events')
      console.error('Error fetching events:', err)
    } finally {
      setLoading(false)
      setRetrying(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleRetry = async () => {
    setRetrying(true)
    await fetchEvents()
  }

  const accessibleEvents = events.filter(event => 
    canAccessTier(userTier, event.tier as Tier)
  )

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  if (loading && !retrying) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Error Loading Events
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <div className="space-y-2">
          <Button 
            onClick={handleRetry}
            disabled={retrying}
            className="inline-flex items-center"
          >
            {retrying ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Retrying...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </>
            )}
          </Button>
          <div className="text-sm text-gray-500">
            <p>Common solutions:</p>
            <ul className="mt-1 space-y-1">
              <li>• Check your internet connection</li>
              <li>• Verify Supabase configuration</li>
              <li>• Check if the events table exists</li>
            </ul>
          </div>
        </div>
      </motion.div>
    )
  }

  if (events.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Events Available
        </h3>
        <p className="text-gray-600 mb-4">
          There are currently no events scheduled.
        </p>
        <Button onClick={handleRetry} variant="outline">
          Refresh
        </Button>
      </motion.div>
    )
  }

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {accessibleEvents.map((event, index) => (
          <motion.div key={event.id} variants={item}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="relative h-48 w-full mb-4">
                  <Image
                    src={event.image_url}
                    alt={event.title}
                    fill
                    className="object-cover rounded-t-lg"
                    onError={(e) => {
                      // Fallback for broken images
                      e.currentTarget.src = '/images/event-placeholder.jpg'
                    }}
                  />
                  <Badge className={`absolute top-2 right-2 ${getTierColor(event.tier as Tier)}`}>
                    {event.tier.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{event.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {event.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(event.event_date)}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {events.length > accessibleEvents.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <Lock className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Upgrade to Access More Events
            </h3>
            <p className="text-gray-600 mb-4">
              There are {events.length - accessibleEvents.length} additional events available to higher tiers.
            </p>
            <Button variant="outline" asChild>
              <a href="/upgrade">Upgrade Tier</a>
            </Button>
          </div>
        </motion.div>
      )}
    </>
  )
}