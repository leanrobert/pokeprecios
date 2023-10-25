import { getServerSession } from "next-auth"
import { authOptions } from "../utils/authOptions"
import { redirect } from "next/navigation"
import { CardBook } from "@/utils/types"
import Image from "next/image"
import { RiDeleteBin6Line, RiFileEditLine, RiShareLine } from "react-icons/ri"
import Link from "next/link"
import DeleteButton from "@/components/DeleteButton"
import CreateBook from "@/components/CreateBook"
import ShareLink from "@/components/ShareLink"
import PremiumPill from "@/components/PremiumPill"

const getCardBooks = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3002/api/user/${id}/cardbook`, { cache: 'no-cache' })

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

export default async function Dashboard() {
	const session = await getServerSession(authOptions)

	if (!session) {
		redirect('/signin?callbackUrl=/dashboard')
	}

	const { data: cardbooks } = await getCardBooks(session.user.id)

	return (
    <div className='flex flex-col h-screen max-w-screen-xl p-4'>
			<div className="flex items-center justify-between mt-[72px] mb-14">
				<div className="flex gap-10">
					<div className="flex flex-col items-start gap-1">
						<h2 className="text-2xl">Bienvenido/a {session.user.name}!</h2>
						<p className="text-sm text-slate-500 space-y-2">{session.user.email}</p>
						<PremiumPill />
					</div>

				</div>
				<CreateBook userId={session.user.id} />
			</div>
			<div>
				{cardbooks.length > 0 ? (
					<div className="grid grid-cols-3 gap-4">
						{cardbooks.map((cardbook: CardBook) => (
							<div key={cardbook.id} className="flex flex-col justify-between h-32 p-4 rounded-lg shadow-md border-t border-l backdrop-blur-md border-white">
								<div className="flex items-center justify-between">
									<p className="text-xl font-semibold">{cardbook.name}</p>
									<p className="text-slate-500 text-sm">{cardbook.cardQuantity.reduce((quantity, current) => quantity + current.quantity, 0)} cards</p>
								</div>
								<div className="flex items-end justify-end gap-4">
									<Link href={`/dashboard/${cardbook.id}`} className="border border-transparent bg-slate-600 text-white p-2 rounded-md shadow-md transition-all duration-300 hover:bg-slate-200 hover:text-black hover:border hover:border-slate-600">
										<RiFileEditLine className="h-6 w-6" />
									</Link>
									<ShareLink id={cardbook.id} />
									<DeleteButton userId={session.user.id} bookId={cardbook.id} />
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="flex flex-col gap-4 items-center justify-center">
						<Image className="h-32 w-auto" src="/gastly.svg" width={300} height={279} alt="Gastly" />
						<p className="text-2xl">No tienes ninguna carpeta creada</p>
						<p className="text-sm text-slate-500">Crea una nueva carpeta para empezar a guardar tus tarjetas y compartelas!</p>
					</div>
				)}
			</div>
		</div>
  )
}