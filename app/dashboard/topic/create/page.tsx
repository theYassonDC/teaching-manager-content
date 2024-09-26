'use client'
import { SuccessMessage, TextEditor } from '@/components'
import { Input } from "@nextui-org/input"
import { useEffect, useState } from 'react'
import { createTopic, getDegree } from '@/services'
import { Button } from "@nextui-org/button";
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
export default function TopicCreatePage() {
  const [degree, setDegree] = useState<any>()
  const [content, setcontent] = useState('')
  const [title, setTitle] = useState('')
  const [success, setSucess] = useState(false)
  const searchParams = useSearchParams()
  const degreeQuery = searchParams.get('degree')
  const router = useRouter()
  const id = degreeQuery!.toString()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getData = async () => {
    const res = await getDegree(id)
    setDegree(res)
  }
  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleClick() {
    const topic = {
      title,
      content,
      degreeId: Number(id)
    }
    const res = await createTopic(topic)
    if (res) setSucess(true)
    if (res) setcontent('')
    if (res) router.push(`/dashboard/degrees/${id}`)
    setTimeout(() => { setSucess(false) }, 3000)
  }
  function hadleInput(e: string) {
    setTitle(e)
  }
  return (
    <>
      <div className='flex flex-col gap-5 p-4'>
        {success ? <SuccessMessage message='Contenido de curso guardado correctamente!' /> : null}
        <Link href={`/dashboard/degrees/${id}`} className='bg-green-500 p-3 rounded-lg text-white w-40'>{`<`} Volver</Link>
        <div className='flex gap-4 items-center'>
          <Input type="text" label='Titulo' className='w-full sm:max-w-[40%]' onValueChange={hadleInput} />
          <p className='text-white font-semibold'>{degree ? `${degree.degree} ${degree.matter}` : 'Load..'}</p>
        </div>
        <TextEditor isToolbar={true} data={content} content={(e: any, editor: any) => {
          const data = editor.getData()
          setcontent(data)
        }} />
        <Button color="primary" className='w-full sm:max-w-[50%] m-auto' onPress={handleClick}>
          Guardar tema
        </Button>
      </div>
    </>
  )
}
