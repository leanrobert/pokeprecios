"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { RiCloseLine, RiMenu4Fill } from "react-icons/ri"
import NavigationMenu from "./NavigationMenu"
import { useSession } from "next-auth/react"

const Navbar = () => {
	const [openMenu, setOpenMenu] = useState<boolean>(false)
	const { data: session } = useSession()

	const toggleMenu = () => {
		setOpenMenu(prev => !prev)
	}

	return (
		<div className="z-50 fixed flex h-14 items-center justify-between bg-white/20 backdrop-blur-md shadow-sm border-l border-t border-white w-full max-w-screen-lg left-1/2 -translate-x-1/2 px-4 sm:rounded-b-lg sm:shadow-md">
			<div className="flex items-center gap-2">
				<Image src='/logo.svg' className="h-5 w-5" height={20} width={20} alt="Pokeprecios" />
				<Link href='/' className="font-bold text-lg">Pokeprecios</Link>
			</div>

			{openMenu
				? (
					<>
						<RiCloseLine className="h-6 w-6" onClick={toggleMenu} />
						<div className="absolute top-14 left-0 p-4 bg-slate-100 w-full rounded-b-xl border-b border-slate-600 shadow-sm">
							<ul className="relative space-y-4">
								<NavigationMenu toggleMenu={() => setOpenMenu(false)} session={session} />
							</ul>
						</div>
					</>
					)
				: (
					<RiMenu4Fill className="h-6 w-6 sm:hidden" onClick={toggleMenu} />
				)
			}

			<ul className="hidden gap-4 sm:flex">
				<NavigationMenu toggleMenu={() => setOpenMenu(false)} session={session} />
			</ul>
		</div>
	)
}

export default Navbar