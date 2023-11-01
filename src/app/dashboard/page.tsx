import { getServerSession } from "next-auth"
import { authOptions } from "../utils/authOptions"
import { redirect } from "next/navigation"
import CreateBook from "@/components/CreateBook"
import PremiumPill from "@/components/PremiumPill"
import { UserCardBookProvider } from "../providers/userCardBookProvider"
import CarpetasGrid from "@/components/CarpetasGrid"
import { SubscriptionProvider } from "../providers/subscriptionProvider"

export default async function Dashboard() {
	const session = await getServerSession(authOptions)

	if (!session) {
		redirect('/signin?callbackUrl=/dashboard')
	}

	return (
		<UserCardBookProvider>
			<div className='flex flex-col h-screen max-w-screen-xl p-4 mb-10'>
				<div className="flex flex-col md:flex-row gap-6 mb-7 items-center justify-between mt-[72px] md:mb-14">
					<div className="flex md:flex-row gap-10">
						<div className="flex flex-col items-start gap-1">
							<h2 className="text-2xl">Bienvenido/a {session.user.name}!</h2>
							<p className="text-sm text-slate-500 space-y-2">{session.user.email}</p>
							<PremiumPill />
						</div>
					</div>
					<CreateBook userId={session.user.id} />
				</div>
				<CarpetasGrid userId={session.user.id} />
			</div>
		</UserCardBookProvider>
  )
}