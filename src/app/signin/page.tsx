"use client"

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

export default function Singin() {
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='flex items-center justify-center h-screen p-4'
		>
			<div className="border-t border-l rounded-lg shadow-md py-20 backdrop-blur-md border-white flex flex-col items-center justify-center">
				<h1 className="text-2xl text-center font-semibold mx-8 max-w-md">Accede a tu cuenta y desbloquea funcionalidades</h1>
				<p className="text-sm my-2">Crea carpetas y añadi tus cartas</p>
				<p className="text-base mb-10">Obten premium para mas benficios aun</p>
				<button onClick={() => signIn("google", { callbackUrl })} className="border border-slate-600 p-4 flex items-center rounded-lg bg-white/20 backdrop-blur-lg shadow-md transition-all duration-300 hover:shadow-xl hover:bg-slate-200">
					<FcGoogle className="h-10 w-10 text-red-500" />
					<span className="ml-2 font-semibold text-lg">Login con Google</span>
				</button>
			</div>
		</motion.div>
	)
}