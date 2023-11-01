"use client"

import React, { ChangeEvent, useEffect, useState, useRef } from 'react'
import CardAdition from './CardAdition'
import { PokeCardQuantity, PokemonCard } from '@/utils/types'
import { useCardBook } from '@/app/providers/cardBookProvider'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface MyCardBookProps {
  owner: string,
  userId: string,
  bookId: string
}

const MyCardBook: React.FC<MyCardBookProps> = ({ owner, userId, bookId }) => {
  const { mybook, setMyBook } = useCardBook()

  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [cards, setCards] = useState([])
  const [page, setPage] = useState(1)
  const [totalCards, setTotalCards] = useState(0)

  const debounceTimerRef = useRef<NodeJS.Timeout>()

  const sumACard = (card: PokeCardQuantity) => {
    const newCard = { ...card, quantity: card.quantity + 1 }
    setMyBook(mybook!.map((card) => card.id === newCard.id ? newCard : card))
  }

  const subACard = (card: PokeCardQuantity) => {
    // if card quantity is 0, remove card from mybook
    if (card.quantity === 1) {
      setMyBook(mybook!.filter((myCard) => myCard.id !== card.id))
    } else {
      const newCard = { ...card, quantity: card.quantity - 1 }
      setMyBook(mybook!.map((myCard) => myCard.id === newCard.id ? newCard : myCard))
    }
  }

  const updateList = async () => {
    const pokemonCards = mybook?.map((card) => ({ id: card.pokemoncardId, quantity: card.quantity }))

    try {
      const res = await fetch(`http://oltmanager.westnet.com.ar:3002/api/user/${userId}/cardbook/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        // we will pass something like [ { "id": "1", "quantity": 2 }, { "id": "2", "quantity": 1 } ]
        body: JSON.stringify({ pokemonCards })
      })

      if (res.ok) {
        toast.success('Carpeta guardada con éxito')
      } else {
        console.log('error')
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    const debouncedSearch = (term: string, page = 1) => {
      setLoading(true)
      clearTimeout(debounceTimerRef.current)

      debounceTimerRef.current = setTimeout(async () => {
        try{
          const response = await fetch(`http://oltmanager.westnet.com.ar:3002/api/cards/?search=${term}&page=${page}`)
          const data = await response.json()
          setCards(data.data)
          setTotalCards(data.amount)
        } catch (error) {
          console.error(error)
        } finally {
          setLoading(false)
        }
      }, 300)
    }

    debouncedSearch(search, page)
  }, [search, page])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearch(value)
  }

  const addToCardBook = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const newCardId = event.currentTarget.id
    const oldPokemonCards = mybook?.map((card) => ({ id: card.pokemoncardId, quantity: card.quantity }))

    // if card is already in mybook, just sum 1 to quantity
    if (oldPokemonCards?.find((card) => card.id === newCardId)) {
      oldPokemonCards.map((card) => card.id === newCardId ? { ...card, quantity: card.quantity + 1 } : card)
      return
    }

    const pokemonCards = [...oldPokemonCards!, { id: newCardId, quantity: 1 }]

    try {
      const res = await fetch(`http://oltmanager.westnet.com.ar:3002/api/user/${userId}/cardbook/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        // we will pass something like [ { "id": "1", "quantity": 2 }, { "id": "2", "quantity": 1 } ]
        body: JSON.stringify({ pokemonCards })
      })

      if (res.ok) {
        const data = await res.json()
        toast.success('Carta agregada con éxito')
        setMyBook(data.updatedCardBook.cardQuantity);
      } else {
        console.log('error')
      }
    } catch (e) {
      console.error(e)
    } finally {
      setPage(1)
    }
  }

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const nextPage = () => {
    if (page * 10 >= totalCards) return
    setPage(page + 1)
  }

  return (
    <>
      {/* My card book */}
      <div className='md:flex-1 order-2 md:order-1 pr-2 overflow-y-scroll mb-12 md:mb-0'>
        <div className='flex flex-col gap-2 md:flex-row items-center justify-between mb-2'>
          <h3 className='text-lg'>Cartas: {mybook ? mybook.reduce((acc, card) => acc + card.quantity, 0) : 0}</h3>
          <p className='border border-green-600 rounded-md px-2 py-1 text-green-600 bg-green-100'>Total: ${mybook?.reduce((acc, card) => acc + card.pokemoncard.cardprices[0].price * card.quantity, 0).toFixed(2)}</p>
          {owner === userId && (
            <div className='flex gap-4'>
              <Link href='/dashboard' className="border bg-slate-200 text-black border-slate-600 py-1 px-2 rounded-md shadow-md transition-all duration-300 hover:bg-slate-600 hover:text-white hover:border hover:border-slate-600">
                Volver
              </Link>
              <button onClick={updateList} className="border border-transparent bg-slate-600 text-white py-1 px-2 rounded-md shadow-md transition-all duration-300 hover:bg-slate-200 hover:text-black hover:border hover:border-slate-600">
                Guardar
              </button>
            </div>
          )}
        </div>
        <div className={`${owner === userId ? 'flex flex-col' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-4 p-2 `}>
          {mybook?.sort((a, b) => b.pokemoncard.name > a.pokemoncard.name ? -1 : 1).map((card: PokeCardQuantity) => (
            <CardAdition owner={owner === userId} key={card.id} card={card} sum={sumACard} sub={subACard} />
          ))}
        </div>
      </div>

      {owner === userId && (
        <>
          <div className='md:order-2 md:h-screen md:w-[2px] rounded-full bg-purple-800' />

          <div className='md:flex-1 px-4 order-1 md:order-3 overflow-y-scroll'>
            <input
              value={search}
              onChange={handleSearch}
              placeholder='Buscar cartas...'
              className='relative rounded-lg border border-slate-600 w-full pl-2 text-sm h-8 focus:outline-none'
            />
            {loading ? (
              <div className='border border-slate-200 rounded-lg shadow-lg mt-4 flex items-center justify-center gap-2 h-40'>
                <AiOutlineLoading3Quarters className="h-6 w-6 text-purple-800 animate-spin" />
                <span className='ml-2'>Cargando...</span>
              </div>
            ) :
            cards.length > 0 && (
              <>
                <div className='mt-4 flex flex-wrap justify-center gap-4 cursor-pointer'>
                  {cards.map((card: PokemonCard) => (
                    <button type="button" onClick={addToCardBook} id={card.id} key={card.id} className='border border-slate-200 rounded-lg shadow-md h-52 w-32 flex flex-col items-center justify-between py-1 px-2'>
                      <div className='flex flex-col items-center'>
                        <span className='line-clamp-1'>{card.name}</span>
                        <span className='text-xs text-gray-500 line-clamp-1'>{card.cardset.name}</span>
                      </div>
                      <Image className='h-40 w-auto' src={card.images_small} alt={card.name} width={240} height={330} priority />
                    </button>
                  ))}
                </div>
                <div className='my-4 flex items-center gap-4 justify-center'>
                  <button onClick={prevPage} className="border border-transparent bg-slate-600 text-white py-1 px-2 rounded-md shadow-md transition-all duration-300 hover:bg-slate-200 hover:text-black hover:border hover:border-slate-600">Prev</button>
                  <p className='text-sm'>{totalCards} cartas</p>
                  <button onClick={nextPage} className="border border-transparent bg-slate-600 text-white py-1 px-2 rounded-md shadow-md transition-all duration-300 hover:bg-slate-200 hover:text-black hover:border hover:border-slate-600">Next</button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default MyCardBook