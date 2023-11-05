'use client'
import { ITopics } from "@/app/api/topic/topic";
import { TextEditor } from "@/components";
import { getTopicId } from "@/services"
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { Link } from "@nextui-org/link";
import { Button } from '@nextui-org/button';

export default function Topic() {
  const params = useParams()
  const [topic, setTopic] = useState<any>({ title: '', content: '', degreeId: 0 })
  const getData = async () => {
    const id: string | any = params?.id
    const res: ITopics = await getTopicId(id)
    setTopic({ title: res.title, content: res.content, degreeId: res.degreeId })
  }
  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <div className="p-5">
        <Button
          href={`/dashboard/degrees/${topic.degreeId}`}
          as={Link}
          color="primary"
          showAnchorIcon
          variant="solid"
        >
          Volver a lista
        </Button>
        <Button as={Link} href={`/dashboard/topic/edit/${topic.id}`} className="p-5" color="success">Editar</Button>
        <h1 className="text-3xl text-white p-4">{topic.title}</h1>
        <TextEditor isToolbar={false} dates={topic.content} content={(e: any, editor: any) => {
          editor.enableReadOnlyMode("editor");
        }} />
      </div>
    </>
  )
}
