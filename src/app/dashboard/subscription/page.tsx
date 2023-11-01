"use client"

import { useSubscription } from '@/app/providers/subscriptionProvider'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { BsCheck, BsX } from 'react-icons/bs'
import { PiWarningCircle } from 'react-icons/pi'

interface Features {
  icon: React.ReactNode
  text: string
}

interface PlanParams {
  title: string
  description: string
  price: number
  features: Features []
  buttonText: string
  onClick: () => void
}

const SubscriptionPlan = ({ title, description, price, features, buttonText, onClick }: PlanParams) => {
  const handleClick = useCallback(() => {
    onClick()
  }, [onClick])

  return (
    <div className="flex flex-col p-4 mx-auto max-w-sm text-center bg-slate-200/50 rounded-lg border border-slate-600 shadow-md">
      <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
      <p className="font-light text-slate-500 sm:text-lg">{description}</p>
      <div className="flex justify-center items-baseline my-8">
        <span className="mr-2 text-5xl font-extrabold">${price}</span>
        <span className="text-slate-500">/mes</span>
      </div>
      <ul className="mx-auto mb-8 space-y-4 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-3">
            {feature.icon}
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
      <button onClick={handleClick} className="border border-transparent bg-slate-600 text-white p-2 rounded-md shadow-md transition-all duration-300 hover:bg-slate-200 hover:text-black hover:border hover:border-slate-600">
        {buttonText}
      </button>
    </div>
  )
}

const SubscriptionPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { isPremium, setIsPremium } = useSubscription()

  console.log(isPremium)

  if (status === 'loading') {
    return (
      <div className='flex flex-col h-screen max-w-screen-xl p-4'>
        <div className='mt-[72px]'>
          <div>Loading...</div>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    redirect('/signin?callbackUrl=/dashboard/subscription')
  }

  const cancelPremium = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${session?.user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ispremium: false })
      })

      if (!response.ok) {
        throw new Error('No se pudo cancelar la subscripcion')
      }

      toast('Se ha cancelado la subscripcion', { icon: '😭' })
      router.push('/dashboard')
      setIsPremium(false)
    } catch (e) {
      console.error(e)
      toast.error('No se pudo cancelar la subscripcion')
    }
  }

  const getPremium = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${session?.user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ispremium: true })
      })

      if (!response.ok) {
        throw new Error('No se pudo obtener la subscripcion')
      }

      toast('Ahora sos Premium!', { icon: '🥳' })
      router.push('/dashboard')
      setIsPremium(true)
    } catch (e) {
      console.error(e)
      toast.error('No se pudo obtener la subscripcion')
    }
  }

  return (
    <div className='flex flex-col max-w-screen-xl p-4 mb-10'>
      <div className='mt-[72px]'>
        {isPremium ? (
          <>
            <h2 className="text-2xl text-center mb-8 font-bold">Eliminar subscripcion</h2>
            <SubscriptionPlan
              title='Plan Free'
              description='Perderas los beneficios de Premium el proximo mes'
              price={0}
              features={[
                {
                  icon: <BsCheck className="flex-shrink-0 w-5 h-5 text-green-500" />,
                  text: 'Actualizaciones todos los dias'
                },
                {
                  icon: <BsX className="flex-shrink-0 w-5 h-5 text-red-500" />,
                  text: 'Links para compartir'
                },
                {
                  icon: <PiWarningCircle className="flex-shrink-0 w-5 h-5 text-yellow-500" />,
                  text: 'Carpetas: hasta 3'
                },
                {
                  icon: <PiWarningCircle className="flex-shrink-0 w-5 h-5 text-yellow-500" />,
                  text: 'Cartas diferentes: 10 por carpeta'
                }
              ]}
              buttonText='Elegir'
              onClick={cancelPremium}
            />
          </>
        ) : (
          <>
            <h2 className="text-2xl text-center mb-8 font-bold">Elegi el plan ideal para vos</h2>
            <div className="max-w-3xl mx-auto space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">
              {/* Plan Free */}
              <SubscriptionPlan
                title='Continua con Free'
                description='Mejor opcion para probar la app.'
                price={0}
                features={[
                  {
                    icon: <BsCheck className="flex-shrink-0 w-5 h-5 text-green-500" />,
                    text: 'Actualizaciones todos los dias'
                  },
                  {
                    icon: <BsX className="flex-shrink-0 w-5 h-5 text-red-500" />,
                    text: 'Links para compartir'
                  },
                  {
                    icon: <BsCheck className="flex-shrink-0 w-5 h-5 text-green-500" />,
                    text: 'Carpetas: hasta 3'
                  },
                  {
                    icon: <BsCheck className="flex-shrink-0 w-5 h-5 text-green-500" />,
                    text: 'Cartas diferentes: 10 por carpeta'
                  }
                ]}
                buttonText='Elegir'
                onClick={() => router.push('/dashboard')}
              />

              {/* Plan Premium */}
              <SubscriptionPlan
                title='Premium'
                description='Mejor opcion para tu negocio.'
                price={1000}
                features={[
                  {
                    icon: <BsCheck className="flex-shrink-0 w-5 h-5 text-green-500" />,
                    text: 'Actualizaciones todos los dias'
                  },
                  {
                    icon: <BsCheck className="flex-shrink-0 w-5 h-5 text-green-500" />,
                    text: 'Links para compartir'
                  },
                  {
                    icon: <BsCheck className="flex-shrink-0 w-5 h-5 text-green-500" />,
                    text: 'Carpetas: hasta 50'
                  },
                  {
                    icon: <BsCheck className="flex-shrink-0 w-5 h-5 text-green-500" />,
                    text: 'Cartas diferentes: 100 por carpeta'
                  }
                ]}
                buttonText='Elegir'
                onClick={getPremium}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SubscriptionPage