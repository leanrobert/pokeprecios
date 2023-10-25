"use client"

import Link from 'next/link'
import React from 'react'

interface ButtonParams {
	search?: string,
	page: string,
	amount: number
}

const PaginationControl = ({ search, page, amount }: ButtonParams) => {
	return (
		<div className='flex items-center justify-center gap-4 pb-4'>
			<Link href={`/search?search=${search}&page=${Number(page) - 1}`}
					className={`border border-slate-600 p-4 flex items-center rounded-lg bg-white/20 backdrop-blur-lg shadow-md transition-all duration-300 hover:shadow-xl hover:bg-slate-200 ${Number(page) <= 1 && 'pointer-events-none opacity-20'}`}
				tabIndex={Number(page) <= 1 ? -1 : undefined}
			>Previous</Link>
			Total: {amount}
			<Link href={`/search?search=${search}&page=${Number(page) + 1}`}
				className={`border border-slate-600 p-4 flex items-center rounded-lg bg-white/20 backdrop-blur-lg shadow-md transition-all duration-300 hover:shadow-xl hover:bg-slate-200 ${(Number(page) * 10 >= amount) && 'pointer-events-none opacity-20'}`}
				tabIndex={Number(page) * 10 >= amount ? -1 : undefined}
			>Next</Link>
		</div>
	)
}

export default PaginationControl