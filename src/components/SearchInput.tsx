"use client"

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { FiSearch } from 'react-icons/fi'

const SearchInput = ({ className }: { className?: string }) => {
  const [search, setSearch] = useState("")
  const router = useRouter()

  const searchCards = (event: FormEvent) => {
    event.preventDefault()
    const encodedSearch = encodeURI(search)
    router.push(`/search?search=${encodedSearch}&page=1`)
  }

  return (
    <form className={`relative mt-[72px] w-full px-10 max-w-screen-lg ${className}`} onSubmit={searchCards}>
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder='Buscar cartas...'
        className='relative rounded-lg border border-slate-600 w-full pl-2 text-sm h-8 focus:outline-none'
      />
      <button type='submit'>
        <FiSearch className='h-5 w-5 absolute right-12 top-1/2 -translate-y-1/2' />
      </button>
    </form>
  )
}

export default SearchInput