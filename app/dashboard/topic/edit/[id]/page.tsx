'use client'
import { ITopics } from "@/app/api/topic/topic";
import { TextEditor } from "@/components";
import { getTopicId, updateTopic } from "@/services"
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { Link } from "@nextui-org/link";
import { Button } from '@nextui-org/button';
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";

export default function TopicEditPage() {
  const params = useParams()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [degreeId, setDegreeId] = useState('')
  const [topicId, setTopicId] = useState<number | any>(0)
  const router = useRouter()
  const getData = async () => {
    const id: string | any = params?.id
    const res: ITopics = await getTopicId(id)
    setTitle(res.title)
    setContent(res.content)
    setDegreeId(`${res.degreeId}`)
    setTopicId(res?.id)
  }
  const handleClick = async () => {
    const id: string | any = params?.id
    const res = await updateTopic({
        id: topicId,
        title,
        content,
    })
    if(res) return router.push(`/dashboard/topic/${id}`)
  }
  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <div className="p-5">
        <Button
          href={`/dashboard/degrees/${degreeId}`}
          as={Link}
          color="primary"
          showAnchorIcon
          variant="solid"
        >
          Volver a lista
        </Button>
        <Input value={title} type="text" label='Titulo' className='w-full sm:max-w-[40%]' onValueChange={(e: string) => setTitle(e)} />
        <TextEditor isToolbar={true} dates={content} content={(e: any, editor: any) => {
          editor.enableReadOnlyMode("editor");
        }} />
        <Button color="primary" className='w-full sm:max-w-[50%] m-auto' onPress={handleClick}>
          Editar
        </Button>
      </div>
    </>
  )
}
