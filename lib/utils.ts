import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const tierOrder = {
  free: 0,
  silver: 1,
  gold: 2,
  platinum: 3,
} as const

export type Tier = keyof typeof tierOrder

export function canAccessTier(userTier: Tier, eventTier: Tier): boolean {
  return tierOrder[userTier] >= tierOrder[eventTier]
}

export function getTierColor(tier: Tier) {
  switch (tier) {
    case 'free':
      return 'bg-gray-100 text-gray-800'
    case 'silver':
      return 'bg-gray-200 text-gray-800'
    case 'gold':
      return 'bg-yellow-100 text-yellow-800'
    case 'platinum':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
} 