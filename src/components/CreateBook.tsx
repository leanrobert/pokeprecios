"use client"

import { useMyCardBook } from '@/app/providers/userCardBookProvider'
import { CardBook } from '@/utils/types'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const CreateCardBook = ({ userId }: { userId: string }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [name, setName] = useState('')
  const { mybooks, setMyBooks } = useMyCardBook()

  const toggleCreation = () => {
    setShowMenu(prev => !prev)
  }

  const createBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name) {
      toast.error('El nombre no puede estar vacio')
      return
    }

    try {
      const response = await fetch(`/api/user/${userId}/cardbook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      })

      if (response.ok) {
        const { data } = await response.json()
        setMyBooks([...mybooks as CardBook[], { ...data, cardQuantity: [] }])
        toast.success('Carpeta creada correctamente')
      }

      if (response.status === 400) {
        const error = await response.json()
        toast.error(error.error)
      }
    } catch (e) {
      console.log(e);
      
      toast.error(`Error al crear la carpeta ${e}`)
    }

    setName('')
    setShowMenu(false)
  }

  return (
    <>
      <button onClick={toggleCreation} className="border border-slate-600 p-4 flex items-center rounded-lg bg-white/20 backdrop-blur-lg shadow-md transition-all duration-300 hover:shadow-xl hover:bg-slate-200">
        Crear Carpeta
      </button>
      {showMenu && (
        <div className='z-50 absolute backdrop-blur-sm w-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center items-center h-screen'>
          <form onSubmit={createBook} className="border-t border-l rounded-lg shadow-md py-8 md:py-20 px-4 md:px-16 bg-slate-100/90 border-white flex flex-col items-center justify-center">
            <h1 className='text-2xl mb-10'>Crea una nueva Carpeta</h1>
            <div className='flex gap-4 items-center mb-10'>
              <label htmlFor='name' className="text-base text-slate-500">Nombre</label>
              <input id="name" value={name} onChange={e => setName(e.target.value)} className='border border-slate-600 rounded-md px-4 text-sm text-slate-800 py-2' />
            </div>
            <div className='flex gap-4'>
              <button type='submit' className="border border-slate-600 p-4 flex items-center rounded-lg bg-white/20 backdrop-blur-lg shadow-md transition-all duration-300 hover:shadow-xl hover:bg-slate-200">Crear Carpeta</button>
              <button type='reset' onClick={toggleCreation} className="border border-transparent bg-slate-600 text-white p-4 rounded-md shadow-md transition-all duration-300 hover:bg-slate-200 hover:text-red-600 hover:border hover:border-slate-600 hover:shadow-xl">Cancelar</button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default CreateCardBook
