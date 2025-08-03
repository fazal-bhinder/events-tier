'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from './card'

export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-4">
              <div className="relative h-48 w-full mb-4 bg-gray-200 animate-pulse rounded-t-lg" />
              <div className="h-6 bg-gray-200 animate-pulse rounded mb-2" />
              <div className="h-4 bg-gray-200 animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 animate-pulse rounded mb-2" />
              <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full"
      />
    </div>
  )
} 