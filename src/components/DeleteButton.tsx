"use client"

import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'

const DeleteButton = ({ userId, bookId }: { userId:string, bookId: string }) => {

  const deleteCardbook = async () => {
    await fetch(`http://oltmanager.westnet.com.ar:3002/api/user/${userId}/cardbook/${bookId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: '1' })
    })

    window.location.reload()
  }

  return (
    <button onClick={deleteCardbook} className="border border-transparent bg-slate-600 text-white p-2 rounded-md shadow-md transition-all duration-300 hover:bg-slate-200 hover:text-red-600 hover:border hover:border-slate-600">
      <RiDeleteBin6Line className="h-6 w-6" />
    </button>
  )
}

export default DeleteButton