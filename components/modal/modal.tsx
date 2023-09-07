import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { useState, useEffect } from 'react';
import { Button } from '@nextui-org/button';
import { Input } from "@nextui-org/input";
import { PlusIcon } from "../svgs/PlusIcon";
import { createDegree } from "@/services";
import { useSession } from "next-auth/react";
import { Progress } from "@nextui-org/progress";
import { getDegrees } from "@/services"
import { SuccessMessage } from "..";

export default function ModalComponent({ degrees, setDegree }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session } = useSession();
  const [course, setCourse] = useState('')
  const [matter, setMatter] = useState('')
  const [success, setSuccess] = useState(false)

  const userSession: any = session?.user
  const handleSubmit = async () => {
    if (!course || !matter) return
    const res = await createDegree({
      degree: course,
      matter: matter,
      teacherId: userSession.id
    })
    if (res?.message) setSuccess(true)
    async function getData() {
      const d = await getDegrees()
      setDegree(d.degrees)
      setSuccess(false)
    }
    getData()
  }
  return (
    <>
      <Button onPress={onOpen} color="success" startContent={<PlusIcon />}>Crear grado</Button>
      {success ? <SuccessMessage message="¡Grado creado correctamente!" /> : null}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Crear grado</ModalHeader>
              <ModalBody>
                <p>
                  Crea un nuevo curso o grado
                </p>
                <Input type="text" label="Nombre del grado" onChange={(v) => setCourse(v.target.value)} />
                <Input type="text" label="Materia" onChange={(v) => setMatter(v.target.value)} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="success" onPress={() => { onClose(); handleSubmit() }}>
                  Agregar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
