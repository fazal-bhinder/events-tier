import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { TierUpgrade } from '@/components/tier-upgrade'
import { Navigation } from '@/components/navigation'

export default async function UpgradePage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <TierUpgrade />
    </div>
  )
} 