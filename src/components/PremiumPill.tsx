"use client"

import { useSubscription } from '@/app/providers/subscriptionProvider'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

const PremiumPill = () => {
  const { isPremium, setIsPremium } = useSubscription()
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsPremium(session?.user?.ispremium)
    if (status === 'authenticated') setIsLoading(false)
  }, [session, status, setIsPremium])

  return (
    isLoading
      ? <Skeleton width={100} height={28} className='mt-2 rounded-full' />
      : isPremium
        ? <Link href='/dashboard/subscription' className="mt-2 bg-green-100 text-green-700 text-lg border border-green-700 px-2 rounded-full">Premium</Link>
        : <Link href='/dashboard/subscription' className="mt-2 border border-transparent bg-purple-800 text-white px-2 rounded-full shadow-md transition-all duration-300 text-center hover:bg-slate-200 hover:text-purple-800 hover:border hover:border-slate-600">Obten Premium</Link>
  )
}

export default PremiumPill