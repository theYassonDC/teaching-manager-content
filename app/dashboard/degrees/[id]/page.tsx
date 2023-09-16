'use client'
import { useParams } from 'next/navigation'
import { ITopics } from "@/app/api/topic/create/topic";
import { Button } from "@nextui-org/button";
// s
// import { useAsyncList } from "@react-stately/data";
import { Spinner } from "@nextui-org/spinner";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Key, useCallback, useEffect, useState } from "react";
import { Link } from '@nextui-org/link';
import { deleteTopic, getTopic } from "@/services";
import { SuccessMessage } from '@/components';

function DegreePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState([])
  const [message, setMessage] = useState('')
  const params = useParams()

  async function getData() {
    const id: string | any = params.id
    const res = await getTopic(id)
    setTopics(res.topic)
  }
  const renderCell = useCallback((topic: ITopics, columnKey: Key) => {
    const cellvalue = topic[columnKey as keyof ITopics]

    switch (columnKey) {
      case 'actions':
        return (
          <Button as={Link} href={`/dashboard/topic/${topic.id}`} color="primary">Ver contenido</Button>
        );
      case 'delete':
        return (
          <>
            <Button onPress={handleDelete} color="danger" id={`${topic.id}`}>Eliminar</Button>
          </>
        );
      default:
        return cellvalue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleDelete = async (e?: any) => {
    const ide = e.target.id
    const res = await deleteTopic(ide)
    if (Boolean(res)) setMessage(`Grado ID: ${ide} eliminado correctamente!`)
    setTimeout(() => { setMessage('') }, 2000)
    getData()
  }

  useEffect(() => {
    getData()
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex flex-col items-center'>
      {message ? <SuccessMessage message={message} /> : null}
      <h1 className='text-zinc-100'>Lista de contenido del grado</h1>
      <Table
        isHeaderSticky
        aria-label="Example table with client side sorting"
        className='p-8'
        classNames={{
          base: "max-h-[440px]",
          table: "min-h-[440px] overflow-scroll",
        }}
      >
        <TableHeader>
          <TableColumn key='id'>ID</TableColumn>
          <TableColumn key="title">Titulo</TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
          <TableColumn key="delete">Eliminar</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          items={topics}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default DegreePage