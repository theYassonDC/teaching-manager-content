'use client'
import { Button } from "@nextui-org/button";
import { Input } from '@nextui-org/input'
import { Divider } from '@nextui-org/divider'
import { useState } from "react";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const handleOnClick = async () => {
    const res = await signIn('credentials', {
      mail,
      password,
      redirect: false
    })
    if (res?.error) return setError(res.error)
    if(res?.ok) return router.push('/dashboard/home')
  }
  return (
    <div className="flex flex-wrap justify-center items-center flex-col gap-5">
      <form className='mt-32 flex flex-col gap-4 bg-white/75 w-96 p-6 rounded-lg'>
        <h1 className='text-xl p-3 text-slate-950 text-center'>Iniciar sesion</h1>
        <Input type="email" label="Email" color='primary' isRequired name='email' onChange={(e) => setMail(e.target.value)} />
        {error ?
          <Input type="password" label="Contraseña" color='danger' isRequired errorMessage='Contraseña incorrecta' onChange={(e) => setPassword(e.target.value)} />
          : <Input type="password" label="Contraseña" color='primary' isRequired name='password' onChange={(e) => setPassword(e.target.value)} />
        }
        <Divider className="my-4" />
        <Button color='success' size='lg' onPress={handleOnClick}>
          Logearme
        </Button>
      </form>
    </div>
  )
}
