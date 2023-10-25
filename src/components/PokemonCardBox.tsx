import { CardPrice, PokemonCard } from '@/utils/types'
import Image from 'next/image'
import React from 'react'

const PokemonCardBox = ({ card }: { card: PokemonCard }) => {
	return (
		<div className="rounded-md overflow-hidden flex h-64 border border-slate-200 shadow-md" key={card.id}>
      <Image src={card.images_small} alt={card.name} width={240} height={330} className="h-64 w-auto rounded-md" />
      <div className="w-full flex flex-col items-center justify-between p-4">
        <div className="w-full text-center">
          <h2 className="font-bold text-lg">{card.name}</h2>
          <p className="text-xs italic">{card.cardset?.series}: {card.cardset.name}</p>
        </div>
        {card.cardprices?.map((price: CardPrice) => (
          <div className="w-full flex flex-col items-center border-b border-purple-200" key={price.id}>
            <p className="font-semibold text-sm text-center">{price.rarity}</p>
            <div className="h-10">
              {price.price
                ? <p className="text-purple-600 font-bold text-xl">${price.price}</p>
                : <p>No price available</p>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PokemonCardBox