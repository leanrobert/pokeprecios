"use client"

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function Singin() {
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

	return (
		<div className='flex items-center justify-center h-screen'>
			<div className="border-t border-l rounded-lg shadow-md py-40 backdrop-blur-md border-white flex flex-col items-center justify-center">
				<h1 className="text-2xl text-center font-semibold mb-10 mx-8">Accede a tu cuenta de google</h1>
				<button onClick={() => signIn("google", { callbackUrl })} className="border border-slate-600 p-4 flex items-center rounded-lg bg-white/20 backdrop-blur-lg shadow-md transition-all duration-300 hover:shadow-xl hover:bg-slate-200">
					<FcGoogle className="h-10 w-10 text-red-500" />
					<span className="ml-2 font-semibold text-lg">Login con Google</span>
				</button>
			</div>
		</div>
	)
}