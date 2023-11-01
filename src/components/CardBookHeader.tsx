"use client"

import { useCardBook } from '@/app/providers/cardBookProvider'
import { CardBook } from '@/utils/types'
import React, { useEffect } from 'react'

const CardBookHeader = ({ cardbook }: { cardbook: CardBook }) => {
  const { setMyBook } = useCardBook()

  useEffect(() => {
    setMyBook(cardbook.cardQuantity)
  }, [cardbook.cardQuantity, setMyBook])

  return (
    <div className="mt-[72px] mb-4">
      <h2 className="text-2xl">Carpeta <span className='font-semibold capitalize'>{cardbook.name}</span></h2>
    </div>
  )
}

export default CardBookHeader