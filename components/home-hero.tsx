'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function HomeHero() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-8 p-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl font-bold text-gray-900 mb-4"
        >
          Tier-Based Event Showcase
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Discover exclusive events tailored to your membership tier. 
          From free community events to premium platinum experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-4"
        >
          <Link href="/sign-in">
            <Button size="lg" className="mr-4">
              Sign In
            </Button>
          </Link>
          
          <Link href="/sign-up">
            <Button variant="outline" size="lg">
              Sign Up
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { tier: 'Free', color: 'bg-gray-100', events: '2 Events' },
            { tier: 'Silver', color: 'bg-gray-200', events: '4 Events' },
            { tier: 'Gold', color: 'bg-yellow-100', events: '6 Events' },
            { tier: 'Platinum', color: 'bg-purple-100', events: '8 Events' },
          ].map((tier, index) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className={`${tier.color} p-4 rounded-lg text-center`}
            >
              <h3 className="font-semibold text-gray-800">{tier.tier}</h3>
              <p className="text-sm text-gray-600">{tier.events}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
} 