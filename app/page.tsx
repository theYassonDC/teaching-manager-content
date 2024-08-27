import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
export const dynamic = 'force-dynamic'
export const revalidate = 0
export default function Home() {
  return (
    <main className="flex min-h-screen flex-wrap items-center flex-col gap-5">
      <h1 className='text-gray-50 text-3xl p-5 mt-24'>Gestion de contenido escolar</h1>
      <Button href='/login' color="primary" radius='md' size='lg' as={Link}>
        Iniciar session
      </Button>
    </main>
  )
}
