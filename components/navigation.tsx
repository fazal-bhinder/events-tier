'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Crown, LogOut } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getTierColor } from '@/lib/utils'

export function Navigation() {
  const { user } = useUser()
  const userTier = (user?.unsafeMetadata?.tier as string) || 'free'

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/events" className="flex items-center space-x-2">
            <Crown className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">EventShowcase</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Badge className={getTierColor(userTier as any)}>
              <Crown className="w-4 h-4 mr-1" />
              {userTier.toUpperCase()}
            </Badge>
            
            <Link href="/upgrade">
              <Button variant="outline" size="sm">
                Upgrade
              </Button>
            </Link>

            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
            />
          </div>
        </div>
      </div>
    </motion.nav>
  )
} 