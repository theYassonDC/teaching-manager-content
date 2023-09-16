'use client'
import { deleteDegree, getDegrees } from "@/services"
import { useState, useEffect, useCallback, Key, useMemo } from "react"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table';
import { Link } from '@nextui-org/link';
import { Spinner } from '@nextui-org/spinner';
import { IDegree } from "@/app/api/degrees/create/degree";
import { Button } from '@nextui-org/button';
import ModalComponent from "@/components/modal/modal";
import { Input } from "@nextui-org/input";
import { SearchIcon, SuccessMessage } from "@/components";
// import { useAsyncList } from "@react-stately/data";
// import { Pagination } from '@nextui-org/pagination';

export default function DashBoardDegrees() {
  const [degrees, setDegree] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const renderCell = useCallback((degrees: IDegree, columnKey: Key) => {
    const cellvalue = degrees[columnKey as keyof IDegree]

    switch (columnKey) {
      case 'action':
        return (
          <Button as={Link} href={`/dashboard/degrees/${degrees.id}`} color="success">Ver panel</Button>
        );

      case 'delete':
        return (
          <>
            <Button color="danger" onPress={handleDelete} id={`${degrees?.id}`} >Eliminar</Button>
          </>
        )

      default:
        return cellvalue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  async function getData() {
    const d = await getDegrees()
    setDegree(d.degrees)
    setIsLoading(false)
  }
  const handleDelete = async (e?: any) => {
    const id = e.target?.id
    const res = await deleteDegree(id)
    if (res) setMessage(`Grado ID: ${id} eliminado correctamente!`)
    setTimeout(() => { setMessage('') }, 2000)
    getData()
  }
  const filterItems = useMemo(() => {
    let usersFilters = [...degrees]
    if (Boolean(filter)) {
      usersFilters = usersFilters.filter((v: IDegree) => {
        return v?.degree.includes(`${filter}`)
      })
    }

    return usersFilters
  }, [degrees, filter])

  const onSearchChange = useCallback(async (value?: string) => {
    if (value) {
      setFilter(value);
    } else {
      setFilter('');
      getData()
    }
  }, []);
  const items = useMemo(() => {
    return filterItems
  }, [filterItems])
  const onClear = useCallback(() => {
    setFilter('')
  }, [])

  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {message ? <SuccessMessage message={message} /> : null}
      <div className="w-[95rem] p-5">
        <div className="flex gap-8 p-4">
          <Input
            className="w-full sm:max-w-[44%]"
            isClearable
            type='text'
            startContent={<SearchIcon />}
            placeholder="Busca un grado o curso"
            value={filter}
            onValueChange={onSearchChange}
            onClear={() => onClear()}
          />
          <ModalComponent setDegree={setDegree} />
        </div>
        <Table
          isHeaderSticky
          aria-label="Example table with dynamic content"
          className="text-black"
          classNames={{
            base: "max-h-[520px]",
            table: "min-h-[400px] overflow-scroll",
          }}
          isStriped
        >
          <TableHeader>
            <TableColumn key="id">ID</TableColumn>
            <TableColumn key="degree">Grado</TableColumn>
            <TableColumn key="matter">Materia</TableColumn>
            <TableColumn key="action">Acciones</TableColumn>
            <TableColumn key="delete">Eliminar</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={"No se encuentra ningun grado o curso"}
            items={items}
            isLoading={isLoading}
            loadingContent={<Spinner label="Cargando..." />}>
            {(item: any) => (
              <TableRow key={item.degree}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div >
  )
}
