

import { CardBookProvider } from '@/app/providers/cardBookProvider'
import { authOptions } from '@/app/utils/authOptions'
import CardBookHeader from '@/components/CardBookHeader'
import { CardBook, PokeCardQuantity } from '@/utils/types'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export const getCardBook = async (id: string, bookId: string) => {
  try {
    const res = await fetch(`http://localhost:3002/api/user/${id}/cardbook/${bookId}`, { cache: 'no-cache' })

    if (res.ok) {
      const data = await res.json()
      return data
    } else {
			return []
		}
  } catch (e) {
    console.error(e)
  }
}

export default async function BookDetial({ params }: { params: { bookId: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/signin?callbackUrl=/dashboard')
  }

  const { data: cardbook }: { data: CardBook} = await getCardBook(session.user.id, params.bookId)

  return (
    <CardBookProvider>
      <div className='flex flex-col max-w-screen-xl p-4 mb-9'>
        <CardBookHeader cardbook={cardbook} />
        <div className='flex-1 flex flex-col md:flex-row gap-4 md:overflow-y-scroll'>
        	<div className='flex-1 order-2 md:order-1'>
        		<div className='flex flex-col gap-2 md:flex-row items-center justify-between mb-2 mr-4'>
          		<h3 className='text-lg'>Cartas: {cardbook.cardQuantity.reduce((acc, card) => acc + card.quantity, 0)}</h3>
          		<p className='border border-green-600 rounded-md px-2 py-1 text-green-600 bg-green-100'>Total: ${cardbook.cardQuantity.reduce((acc, card) => acc + card.pokemoncard.cardprices[0].price * card.quantity, 0).toFixed(2)}</p>
        		</div>
        		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2 mr-2'>
          		{cardbook.cardQuantity.sort((a, b) => b.pokemoncard.name > a.pokemoncard.name ? -1 : 1).map((card: PokeCardQuantity) => (
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
									<div className='flex flex-col items-center gap-2'>
										<div className='flex items-center gap-4'>
											<p className='text-lg font-bold text-purple-800'>{card.quantity}</p>
										</div>
										<div className='border border-purple-300 text-purple-800 bg-purple-100 rounded-xl px-2'>
											${(card.pokemoncard.cardprices[0].price * card.quantity).toFixed(2)}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
        </div>
      </div>
    </CardBookProvider>
  )
}