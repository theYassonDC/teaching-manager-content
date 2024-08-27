'use client'
import { Key, useCallback, useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
// import { useAsyncList } from "@react-stately/data";
import { Spinner } from "@nextui-org/spinner";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Link } from '@nextui-org/link';
import { deleteTopic, getDegree, getTopic } from "@/services";
import { ITopics } from "@/app/api/topic/topic";
import { SuccessMessage } from '@/components';
function DegreePage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState([])
  const [message, setMessage] = useState('')
  const [degree, setDegree] = useState<any>(null)

  const { id } = params
  async function getData() {
    const res = await getTopic(id)
    const de = await getDegree(id)
    setTopics(res.topic)
    setDegree(de)
  }
  const renderCell = useCallback((topic: ITopics, columnKey: Key) => {
    const cellvalue = topic[columnKey as keyof ITopics]

    switch (columnKey) {
      case 'actions':
        return (
          <Button as={Link} href={`/dashboard/topic/${topic.id}`} color="primary">Ver contenido</Button>
        );
      case 'edit':
        return (
          <Button as={Link} href={`/dashboard/topic/edit/${topic.id}`} color="primary">Editar</Button>
        )
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
    try {
      getData()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <div className="flex flex-row gap-2 items-center">
      <Link href="/dashboard/degrees" className="text-white pl-2 text-lg hover:text-white/40 font-bold">{'<'}</Link>
        <div className="flex flex-col p-4 text-lg">
          <h1 className="text-white">Grado {degree ? degree?.degree : 'Load...'}</h1>
          <h1 className="text-white font-bold">{degree ? degree?.matter : 'Load...'}</h1>
        </div>
        <Button as={Link} href="/dashboard/topic/create" color="primary">Crear tema nuevo</Button>
      </div>
      <div className='flex flex-col items-center'>
        {message ? <SuccessMessage message={message} /> : null}
        <Table
          isHeaderSticky
          aria-label="Example table with client side sorting"
          className='p-8'
          classNames={{
            base: "max-h-[500px]",
            table: "min-h-[450px] overflow-scroll",
          }}
        >
          <TableHeader>
            <TableColumn key='id'>ID</TableColumn>
            <TableColumn key="title">Titulo</TableColumn>
            <TableColumn key="actions">Actions</TableColumn>
            <TableColumn key="edit">Edit</TableColumn>
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
    </>
  )
}

export default DegreePage