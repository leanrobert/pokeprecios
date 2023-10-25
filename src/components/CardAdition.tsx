"use client"

import { CardQuantity, PokeCardQuantity } from '@/utils/types'
import Image from 'next/image'
import React from 'react'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'

interface CardAditionProps {
  card: PokeCardQuantity,
  sum: (card: PokeCardQuantity) => void,
  sub: (card: PokeCardQuantity) => void
}

const CardAdition: React.FC<CardAditionProps> = ({ card, sum, sub }) => {
  return (
    <div key={card.id} className='flex items-center justify-between border border-slate-200 shadow-md rounded-lg p-2'>
      <div className='flex items-center gap-4'>
        <div className='relative w-16 h-16 min-w-[64px]'>
          <Image className='h-16 w-auto' priority alt={card.pokemoncard.name} src={card.pokemoncard.images_small} height={330} width={240} />
        </div>
        <p className='text-slate-500 line-clamp-2'>
          <span className='font-bold'>{card.pokemoncard.name}{' '}</span>
          <span>{card.pokemoncard.cardset.series}: {card.pokemoncard.cardset.name}</span>
        </p>
      </div>
      <div className='flex items-center gap-4'>
        <button onClick={() => sub(card)} className=''>
          <AiOutlineMinusCircle className="h-7 w-7" />
        </button>
        <p className='text-lg font-bold text-purple-800'>{card.quantity}</p>
        <button onClick={() => sum(card)} className=''>
          <AiOutlinePlusCircle  className="h-7 w-7"/>
        </button>
      </div>
    </div>
  )
}

export default CardAdition