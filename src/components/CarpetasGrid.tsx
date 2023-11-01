"use client"

import Image from 'next/image'
import React, { useEffect } from 'react'
import DeleteButton from './DeleteButton'
import ShareLink from './ShareLink'
import { RiEyeLine, RiFileEditLine } from 'react-icons/ri'
import Link from 'next/link'
import { CardBook } from '@/utils/types'
import { useMyCardBook } from '@/app/providers/userCardBookProvider'
import Skeleton from 'react-loading-skeleton'

const CarpetasGrid = ({ userId }: { userId: string }) => {
  const { mybooks, setMyBooks } = useMyCardBook()

  useEffect(() => {
   fetch(`http://oltmanager.westnet.com.ar:3002/api/user/${userId}/cardbook`, { cache: 'no-cache' })
      .then((res) => res.json())
      .then((data) =>
        setMyBooks(data.data)
      )
  }, [userId, setMyBooks])

  return (
    <div>
      {!mybooks ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
          <Skeleton height={128} count={3} />
          <Skeleton height={128} count={2} />
        </div>
      ) : (
        mybooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {mybooks.map((cardbook: CardBook) => (
              <div key={cardbook.id} className="flex flex-col justify-between h-32 p-4 rounded-lg shadow-md border-t border-l backdrop-blur-md border-white">
                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold capitalize">{cardbook.name}</p>
                  <p className="text-slate-500 text-sm">{cardbook.cardQuantity?.reduce((quantity, current) => quantity + current.quantity, 0)} cartas</p>
                </div>
                <div className="flex items-end justify-end gap-4">
                  <Link href={`/dashboard/${cardbook.id}/watch`} className="border border-transparent bg-slate-600 text-white p-2 rounded-md shadow-md transition-all duration-300 hover:bg-slate-200 hover:text-black hover:border hover:border-slate-600">
                    <RiEyeLine className="h-6 w-6" />
                  </Link>
                  <Link href={`/dashboard/${cardbook.id}`} className="border border-transparent bg-slate-600 text-white p-2 rounded-md shadow-md transition-all duration-300 hover:bg-slate-200 hover:text-black hover:border hover:border-slate-600">
                    <RiFileEditLine className="h-6 w-6" />
                  </Link>
                  <ShareLink id={cardbook.id} />
                  <DeleteButton userId={userId} bookId={cardbook.id} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 items-center justify-center">
            <Image className="h-32 w-auto" src="/gastly.svg" width={300} height={279} alt="Gastly" />
            <p className="text-2xl">No tienes ninguna carpeta creada</p>
            <p className="text-sm text-slate-500">Crea una nueva carpeta para empezar a guardar tus tarjetas y compartelas!</p>
          </div>
        )
      )}
    </div>
  )
}

export default CarpetasGrid