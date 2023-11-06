'use client'
import { SuccessMessage, TextEditor } from '@/components'
import { Select, SelectItem } from '@nextui-org/select'
import { Input } from "@nextui-org/input"
import { ChangeEvent, useEffect, useState } from 'react'
import { createTopic, getDegrees } from '@/services'
import { Button } from "@nextui-org/button";
import { useRouter } from 'next/navigation'

export default function TopicCreatePage() {
  const [degrees, setDegree] = useState([])
  const [content, setcontent] = useState('')
  const [title, setTitle] = useState('')
  const [selectDegree, setSelectDegree] = useState('')
  const [success, setSucess] = useState(false)
  const router = useRouter()
  const getData = async () => {
    const res = await getDegrees()
    setDegree(res.list)
  }
  useEffect(() => {
    getData()
  }, [])

  async function handleClick() {
    const topic = {
      title,
      content,
      degreeId: parseInt(selectDegree)
    }
    const res = await createTopic(topic)
    if (res) setSucess(true)
    if(res) setcontent('')
    if(res) router.push(`/dashboard/degree/${selectDegree}`)
    setTimeout(() => { setSucess(false) }, 3000)
  }
  function hadleInput(e: string) {
    setTitle(e)
  }
  return (
    <>
      <div className='flex flex-col gap-5 p-4'>
        {success ? <SuccessMessage message='Contenido de curso guardado correctamente!' /> : null}
        <div className='flex gap-4'>
          <Input type="text" label='Titulo' className='w-full sm:max-w-[40%]' onValueChange={hadleInput} />
          <Select
            label="Selecciona un grado o curso"
            className="max-w-xs"
            onChange={(k: ChangeEvent<HTMLSelectElement>) => setSelectDegree(k.target.value)}
          >
            {degrees.map((degree: any, index) => (
              <SelectItem key={degree?.id} value={degree?.degree}>
                {degree.degree}
              </SelectItem>
            ))}
          </Select>
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
