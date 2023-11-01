import Image from "next/image"
import Link from "next/link"
import { BsGithub, BsLinkedin } from "react-icons/bs"

const AboutPage = () => {
  return (
    <div className="flex flex-col justify-center p-4 max-w-screen-md mx-auto mb-14">
      <div className="flex items-center justify-center gap-4 mt-14">
        <h1 className="text-3xl my-6">Hola a todos!</h1>
        <Image src="/logo.svg" alt="Pokeprecios" height={32} width={32} priority quality={100} />
      </div>
      <p className="text-md text-slate-800 my-2">
        Somos <b>Pokeprecios</b>, un grupo de personas de Argentina fanaticas de Pokémon TCG.
        Nacimos con el objetivo de poder ayudar a la comunidad a tener un lugar donde
        poder ver los precios de las cartas de Pokémon TCG en pesos argentinos y
        ayudarlos a compartir sus carpetas con sus amigos.
      </p>

      <h2 className="text-2xl text-left my-4">Nuestra Historia</h2>
      <p className="text-md text-slate-800 my-2">
        En el 2023, con un grupo de amigos decidimos empezar a jugar Pokémon TCG. Teniamos
        experiencia en otros TCGs como Yu-Gi-Oh! por lo que nos fue facil aprender a jugar.
      </p>

      <p className="text-md text-slate-800 my-2">
        Al poco tiempo de empezar notamos como la comunidad tenia un mercado de cartas en
        donde tasaban el precio de cada carta al dolar blue del dia. Esto ser convertia en
        una tarea muy tediosa ya que dia a dia el dolar fluctuaba, y habia que volver a calcular
        cada una de las cartas. Ademas de no haber un medio en donde uno pudiera postular todas
        sus cartas y actualizar sus precios diariamente.
      </p>

      <p className="text-md text-slate-800 my-2">
        Asi nacio Pokeprecios, como una solucion a esta problematica, para poder brindar a los
        jugadores una manera sencilla de mantener al dia el valor de sus cartas, poder compartir
        sus carpetas, y simplificar sus negociaciones.
      </p>

      <h2 className="text-2xl text-left my-4">Nuestro Equipo</h2>
      <div className="flex flex-wrap items-center justify-around">
        <figure className="flex flex-col items-center justify-center gap-4">
          <Image className="h-auto w-60 rounded-full" src="/LRobertX.jpeg" alt="Leandro Robert" height={960} width={960} priority quality={100} />
          <figcaption className="flex flex-col items-center gap-1">
            <p className="font-bold">Leandro Robert</p>
            <p className="text-purple-800">Main Developer</p>
            <div className="flex p-2 gap-2">
              <Link href='https://www.linkedin.com/in/leandro-robert-sosa-166204188/' target="_blank" className="text-purple-400 transition-all duration-300 hover:text-purple-800">
                <BsLinkedin className="h-6 w-6" />
              </Link>
              <Link href='https://github.com/leanrobert' target="_blank" className="text-purple-400 transition-all duration-300 hover:text-purple-800">
                <BsGithub className="h-6 w-6" />
              </Link>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  )
}

export default AboutPage