'use client'
import { Input } from '@nextui-org/input'
import { Divider } from '@nextui-org/divider';
import { Button } from "@nextui-org/button";
import { Checkbox } from '@nextui-org/checkbox';
import { registerUser } from '@/services';
import { useRouter } from "next/navigation";
import { useState } from 'react';

export default function RegisterPage() {
  const [nickname, setNickname] = useState('')
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState(false)
  const route = useRouter()
  const handleSubmit = async (e: any) => {
    try {
      if (!mail) return setError(true)
      if(!password2) return
      await registerUser({
        nickname,
        mail,
        password,
        avatar: 'https://res.cloudinary.com/torrecoin-mda/image/upload/v1692558526/Assets%20teaching-manager/kk2zsq5yh4gywydufdyw.webp'
      })
      route.push('/login')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex flex-wrap justify-center items-center flex-col gap-5">
      <form className='mt-32 flex flex-col gap-4 bg-white/75 w-96 p-6 rounded-lg'>
        <h1 className='text-xl p-3 text-slate-950 text-center'>Registrarme al sistema</h1>
        <p className='text-sm text-gray-700'>Recuerda tener correo institucional de docente para poder registrarte en el sistema</p>
        <Input type="text" label="Nickname" color='primary' isRequired name='nickname' onChange={(e) => setNickname(e.target.value)} />
        {error ?
          <Input type="email" label="Email" color='danger' isRequired name='email' errorMessage="Escribe un correo electronico valido" onChange={(e) => {setMail(e.target.value); setError(false)}} />
          : <Input type="email" label="Email" color='primary' isRequired name='email' onChange={(e) => setMail(e.target.value)} />
        }
        <Input type="password" label="Contraseña" color='primary' isRequired name='password' onChange={(e) => setPassword(e.target.value)} />
        {password !== password2 ?
          <Input type="password" label="Contraseña de nuevo" color='danger' isRequired errorMessage="Confirma tu contraseña" onChange={(e) => setPassword2(e.target.value)} />
          : <Input type="password" label="Contraseña de nuevo" color='primary' isRequired onChange={(e) => setPassword2(e.target.value)} />
        }
        <Checkbox size="sm">Acepto que soy docente</Checkbox>
        <Divider className="my-4" />
        <Button color='success' size='lg' onPress={handleSubmit}>
          Crear cuenta
        </Button>
      </form>
    </div>
  )
}
