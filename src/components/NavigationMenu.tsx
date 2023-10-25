"use client"

import { Session } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const NavigationMenu = ({ toggleMenu, session }: { toggleMenu: () => void, session: Session | null }) => {
	return (
		<>
			<li onClick={toggleMenu}><Link href='/search'>Search</Link></li>
			<li className='h-px w-full bg-slate-300 sm:hidden' />

			{!session ? (
				<li onClick={toggleMenu}><Link href='/signin'>Login</Link></li>
				) : (
					<>
						<li onClick={toggleMenu}><Link href='/dashboard'>Dashboard</Link></li>
						<li className='h-px w-full bg-slate-300 sm:hidden' />
						<li onClick={toggleMenu}><button onClick={() => signOut()}>Logout</button></li>
					</>
				)}
		</>
	)
}

export default NavigationMenu