import Steps from "@/components/Steps";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <div className="my-40 space-y-8">
        <div className="flex items-center md:justify-center gap-2">
          <h1 className="text-4xl font-bold">Bienvenidos a Pokeprecios</h1>
          <Image src="/logo.svg" height={32} width={32} alt="logo" className="hidden md:block" />
        </div>
        <p className="text-lg">Encontra los precios de todas las cartas, crea carpetas y compartilas con tus amigos!</p>
      </div>

      <Link href={'/dashboard'} className="mb-40 border border-purple-600 text-purple-600 text-xl py-6 px-10 lg:text-lg lg:px-6 lg:py-4 flex items-center gap-2 rounded-xl bg-purple-100 shadow-md transition-all duration-300 hover:shadow-xl hover:bg-slate-200">
        Comenzar <BsArrowRight className="h-6 w-6" />
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        <Steps step="1" title="Crea una carpeta" img="/pp1.PNG" width={703} height={569} />
        <Steps step="2" title="Agrega tus cartas" img="/pp2.PNG" width={1305} height={851} />
        <Steps step="3" title="Visualiza y comparte tus carpetas!" img="/pp3.PNG" width={553} height={470} />
      </div>
    </div>
  )
}
