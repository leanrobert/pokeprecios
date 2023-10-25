"use client"

import React from 'react'
import toast from 'react-hot-toast'
import { RiShareLine } from 'react-icons/ri'

const ShareLink = ({ id }: { id: string }) => {
  const handlershare = () => {
    navigator.clipboard.writeText(`https://www.oltmanager.westnet.com.ar:3002/dashboard/${id}`)
    toast.success('Link copied to clipboard')
  }

  return (
    <button onClick={handlershare} className="border border-transparent bg-slate-600 text-white p-2 rounded-md shadow-md transition-all duration-300 hover:bg-slate-200 hover:text-black hover:border hover:border-slate-600">
      <RiShareLine className="h-6 w-6" />
    </button>
  )
}

export default ShareLink