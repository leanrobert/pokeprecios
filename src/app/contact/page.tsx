"use client"

import toast from "react-hot-toast"
import { useForm } from "react-hook-form"

export type FormData = {
  name: string,
  email: string,
  message: string
}

const ContactPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>()

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await fetch('/api/email', { method: 'POST', body: JSON.stringify(formData) })
      await response.json()
      toast.success('Email enviado')
      reset()
    } catch(error) {
      toast.error('Error al enviar el email')
    }
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center p-4 max-w-screen-md mx-auto">
      <h1 className="text-3xl my-6">Envianos un mensaje</h1>
      <p className="text-base text-slate-800 max-w-md text-center my-4">
        Si necesitas ayuda, tienes dudas sobre la aplicacion o algun problema, no dudes en contactarnos.
      </p>
      <p className="text-purple-800 text-center mb-6">
        Esperamos poder ayudarte!
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="border-t border-l border-white rounded-lg shadow-md flex flex-col gap-6 py-8 px-4">
        <div className="grid grid-cols-4 items-center gap-6 text-slate-600">
          <label htmlFor="name" className="mr-4">Nombre</label>
          <input placeholder="Nombre" {...register('name', { required: true })} className="col-span-3 rounded-md border border-purple-200 px-2 py-1 h-6 outline-none " type="text" />
          <label htmlFor="email" className="mr-4">Email</label>
          <input placeholder="email@gmail.com" {...register('email', { required: true })} className="col-span-3 rounded-md border border-purple-200 px-2 py-1 h-6 outline-none" type="email" />
          <label htmlFor="message" className="mr-4">Mensaje</label>
          <textarea placeholder="Tu mensaje..." {...register('message', { required: true })} className="col-span-3 rounded-md border border-purple-200 py-1 px-2 h-32 outline-none"  />
        </div>
        <button className="border border-purple-200 p-4 text-slate-600 rounded-lg bg-white/20 backdrop-blur-lg shadow-md transition-all duration-300 hover:shadow-xl hover:bg-purple-100 hover:text-purple-800" type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default ContactPage