"use client"

import { AiOutlineDown } from "react-icons/ai"
import { useState } from "react"

interface AccordionProps {
  index: number,
  handleOpen: (value: number) => void,
  title: string,
  description: string[],
  open: number
}

const AcordionSingle = ({ index, handleOpen, title, description, open }: AccordionProps) => {
  return (
    <div onClick={() => handleOpen(index)} className={`w-full cursor-pointer p-4 border-t border-l shadow-md border-white rounded-md mb-4 duration-300 group ${open === index ? 'is-active bg-purple-100' : ''}`}>
      <div className="flex items-center">
        <div className="w-full group-[.is-active]:font-bold">
          {title}
        </div>
        <div className="text-xl cursor-pointer duration-500 group-[.is-active]:rotate-[180deg] group-[.is-active]:font-bold">
          <AiOutlineDown className="h-4 w-4 " />
        </div>
      </div>
      <div className="mt-4 overflow-hidden duration-500 max-h-0 group-[.is-active]:max-h-[500px]">
        {description.map((item, index) => (
          <p className="text-base my-2" key={index}>{item}</p>
        ))}
      </div>
    </div>
  )
}

const FAQPage = () => {
  const [open, setOpen] = useState(1)

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value)
  }

  return (
    <div className="flex flex-col items-center justify-center max-w-screen-md mx-auto py-20">
      <h1 className="text-2xl mb-4">Preguntas Frecuentes</h1>
      <AcordionSingle
        index={1}
        handleOpen={handleOpen}
        title="¿Que es Pokeprecios?"
        description={[
          'Pokeprecios es una aplicacion web destinada a facilitar la busqueda de precios, creacion de carpetas de cartas, y compartir tus carpetas con otros usuarios',
          'Nuestro objetivo principal es poder ayudar a los usuarios de Pokemon TCG a administrar sus cartas de una manera mas facil y rapida',
        ]}
        open={open}
      />

      <AcordionSingle
        index={2}
        handleOpen={handleOpen}
        title="¿Como puedo suscribirme o desuscribirme de premium?"
        description={[
          'Desde tu dashboard personal puedes hacer click en el boton pildora que dice "Premium" u "Obten Premium" y te llevara a la pagina de suscripcion',
          'Tambien puedes hacerlo navegando directamente al enlace http://oltmanager.westnet.com.ar:3002/dashboard/subscription, una vez ahi, podras elegir el plan que mejor se adapte a tus necesidades',
        ]}
        open={open}
      />

      <AcordionSingle
        index={3}
        handleOpen={handleOpen}
        title="¿Que pasa si olvido cancelar mi subscription?"
        description={[
          'La subscripcion a la pagina sera mensual, por lo que si olvidas cancelarla, se renovara automaticamente',
          'Si esto sucede, puedes cancelarla en cualquier momento desde tu dashboard personal, o enviando un correo a soporte@pokeprecios.com.ar'
        ]}
        open={open}
      />

      <AcordionSingle
        index={4}
        handleOpen={handleOpen}
        title="¿Porque existe una version premium?"
        description={[
          'La version premium existe para poder solventar los gastos de mantenimiento del servidor, y para poder seguir agregando nuevas funcionalidades a la aplicacion',
          'Ademas, los usuarios premium tienen acceso a funcionalidades exclusivas, como por ejemplo, la posibilidad de crear carpetas de cartas ilimitadas',
        ]}
        open={open}
      />

      <AcordionSingle
        index={5}
        handleOpen={handleOpen}
        title="¿Es mi inforacion personal segura?"
        description={[
          'Si, Pokeprecios solo utiliza tu correo gmail para poder administrar tu cuenta, y no almacena ningun tipo de informacion personal, al obtener estos datos de Google, la seguridad es total',
        ]}
        open={open}
      />

      <AcordionSingle
        index={6}
        handleOpen={handleOpen}
        title="Si tengo un problema ¿Como puedo contactar al soporte?"
        description={[
          'Puedes hacerlo desde el final de la pagina en el boton "Contacto", o enviando un correo a soporte@pokeprecios.com.ar, intentaremos responderte lo mas rapido posible',
        ]}
        open={open}
      />
    </div>
  )
}

export default FAQPage