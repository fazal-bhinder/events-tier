import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { HomeHero } from '@/components/home-hero'

export default async function HomePage() {
  const { userId } = await auth()
  if (userId) {
    redirect('/events')
  }
  return <HomeHero />
} 