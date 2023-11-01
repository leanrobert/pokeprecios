"use client"

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

interface StepsProps {
	step: string
	title: string
	img: string
	width: number
	height: number
}

const Steps = ({ step, title, img, width, height }: StepsProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 100 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-h-[432px] border-t-4 border-purple-200 p-4'
		>
			<div className="flex items-center gap-4">
				<div className="border-2 border-purple-400 bg-purple-100 rounded-full h-16 w-16 min-w-[64px] flex items-center justify-center p-1">
					<p className="text-purple-600 text-xl font-bold">{step}</p>
				</div>
				<p className="text-2xl">{title}</p>
			</div>
			<div className="my-4 first-letter:border border-slate-400 shadow-md p-1 rounded-2xl">
				<Image className="border border-slate-200 rounded-xl" src={img} alt="paso1" width={width} height={height} priority quality={100} />
			</div>
		</motion.div>
	)
}

export default Steps