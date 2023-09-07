'use client'
import { useSession } from 'next-auth/react'
import { Button } from "@nextui-org/button";
import { Link } from '@nextui-org/link';

export default function DashboardPage() {
  const { data: session }: any = useSession()
  const user = session?.user?.username
  return (
    <div className='flex justify-center mt-24 flex-col items-center gap-6'>
      <p className='text-3xl text-white'>¡Hola bienvenido <span className='text-green-400'>{user}</span> administra tu contenido de cursos ahora!</p>
      <Button as={Link} href='/dashboard/degrees' color="success">
        Ver lista de cursos
      </Button>  
    </div>
  )
}
