"use client"

import { useSubscription } from '@/app/providers/subscriptionProvider'
import Link from 'next/link'
import React from 'react'

const PremiumPill = () => {
  const { isPremium } = useSubscription()

  if (isPremium) {
    return <Link href='/dashboard/subscription' className="mt-2 bg-green-100 text-green-700 text-lg border border-green-700 px-2 rounded-full">Premium</Link>
   } else {
    return <Link href='/dashboard/subscription' className="mt-2 border border-transparent bg-purple-800 text-white px-2 rounded-full shadow-md transition-all duration-300 text-center hover:bg-slate-200 hover:text-purple-800 hover:border hover:border-slate-600">Obten Premium</Link>
  }
}

export default PremiumPill