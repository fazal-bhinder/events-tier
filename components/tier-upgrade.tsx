'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Crown, Check, ArrowUp, ArrowDown } from 'lucide-react'
import { Tier, getTierColor } from '@/lib/utils'

const tiers: { name: Tier; price: string; features: string[] }[] = [
  {
    name: 'free',
    price: 'Free',
    features: ['Access to 2 events', 'Basic community features']
  },
  {
    name: 'silver',
    price: '$9.99/month',
    features: ['Access to 4 events', 'Priority support', 'Early access']
  },
  {
    name: 'gold',
    price: '$19.99/month',
    features: ['Access to 6 events', 'VIP support', 'Exclusive content', 'Discounts']
  },
  {
    name: 'platinum',
    price: '$39.99/month',
    features: ['Access to all events', '24/7 support', 'Exclusive events', 'All benefits']
  }
]

const tierOrder = {
  free: 0,
  silver: 1,
  gold: 2,
  platinum: 3,
} as const

export function TierUpgrade() {
  const { user } = useUser()
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedTier, setProcessedTier] = useState<Tier | null>(null)
  const [actionType, setActionType] = useState<'upgrade' | 'downgrade' | null>(null)

  const currentTier = processedTier || (user?.unsafeMetadata?.tier as Tier) || 'free'

  const handleTierChange = async (tier: Tier, action: 'upgrade' | 'downgrade') => {
    if (!user) return

    setIsProcessing(true)
    setActionType(action)
    
    try {
      await user.update({
        unsafeMetadata: { tier }
      })
      setProcessedTier(tier)
      
      // Show success message for a moment, then reset states
      setTimeout(() => {
        setProcessedTier(null)
        setActionType(null)
      }, 2000)
    } catch (error) {
      console.error(`Error ${action}ing tier:`, error)
    } finally {
      setIsProcessing(false)
    }
  }

  const getButtonContent = (tier: { name: Tier; price: string; features: string[] }) => {
    const isCurrentTier = tier.name === currentTier
    const isProcessed = processedTier === tier.name
    const canUpgrade = tierOrder[tier.name] > tierOrder[currentTier]
    const canDowngrade = tierOrder[tier.name] < tierOrder[currentTier]

    if (isCurrentTier) {
      return {
        disabled: true,
        variant: 'default' as const,
        className: 'w-full',
        content: 'Current Tier'
      }
    }

    if (isProcessed) {
      return {
        disabled: true,
        variant: 'default' as const,
        className: `w-full ${actionType === 'upgrade' ? 'bg-green-500' : 'bg-blue-500'}`,
        content: actionType === 'upgrade' ? 'Upgraded!' : 'Downgraded!'
      }
    }

    if (canUpgrade) {
      return {
        disabled: isProcessing,
        variant: 'default' as const,
        className: 'w-full',
        onClick: () => handleTierChange(tier.name, 'upgrade'),
        content: (
          <>
            <ArrowUp className="w-4 h-4 mr-2" />
            {isProcessing && actionType === 'upgrade' ? 'Upgrading...' : 'Upgrade'}
          </>
        )
      }
    }

    if (canDowngrade) {
      return {
        disabled: isProcessing,
        variant: 'destructive' as const,
        className: 'w-full',
        onClick: () => handleTierChange(tier.name, 'downgrade'),
        content: (
          <>
            <ArrowDown className="w-4 h-4 mr-2" />
            {isProcessing && actionType === 'downgrade' ? 'Downgrading...' : 'Downgrade'}
          </>
        )
      }
    }

    // This shouldn't happen, but just in case
    return {
      disabled: true,
      variant: 'outline' as const,
      className: 'w-full',
      content: 'Unavailable'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Manage Your Tier
        </h2>
        <p className="text-gray-600">
          Upgrade to unlock more events or downgrade to save money
        </p>
        <div className="mt-4">
          <Badge variant="outline" className="text-lg px-4 py-2">
            Current: <span className="capitalize font-semibold ml-1">{currentTier}</span>
          </Badge>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier, index) => {
          const isCurrentTier = tier.name === currentTier
          const buttonProps = getButtonContent(tier)

          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full relative ${isCurrentTier ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}>
                {isCurrentTier && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white">
                      Current Tier
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-2">
                    <Crown className={`w-8 h-8 ${getTierColor(tier.name).includes('yellow') ? 'text-yellow-500' : 'text-gray-500'}`} />
                  </div>
                  <CardTitle className="text-xl capitalize">{tier.name}</CardTitle>
                  <CardDescription className="text-2xl font-bold">
                    {tier.price}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      {feature}
                    </div>
                  ))}
                </CardContent>

                <div className="p-6 pt-0">
                  <Button
                      {...buttonProps}
                    onClick={buttonProps.onClick}
                  >
                    {buttonProps.content}
                  </Button>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Warning message for downgrades */}
      {tierOrder[currentTier] > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Downgrade Notice
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Downgrading your tier will reduce your event access and remove premium features. 
                  This change will take effect immediately.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}