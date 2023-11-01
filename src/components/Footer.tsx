import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="z-50 fixed flex h-10 items-center justify-center bg-white/20 backdrop-blur-md border-l border-t border-white w-full max-w-screen-lg bottom-0 left-1/2 -translate-x-1/2 sm:rounded-t-lg">
      <ul className='text-slate-800 grid grid-cols-3 text-xs items-center justify-between w-full text-center gap-1'>
        <li><Link href='/aboutus'>Sobre Nosotros</Link></li>
        <li><Link href='/contact'>Contactanos</Link></li>
        <li><Link href='/faq'>FAQs</Link></li>
      </ul>
    </div>
  )
}

export default Footer