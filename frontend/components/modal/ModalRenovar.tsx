
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { MailIcon } from './MailIcon.jsx';

import { User } from "@/lib/types.js";
import { useJwtToken } from "@/hooks/useJwtToken";
export default function ModalRenovar({ isOpen, onClose }: any) {

  const handleClose = () => {
    onClose();
  };

  const token = useJwtToken();
  const route = useRouter();

  async function handleAddUser(form: FormData) {

    try {
      if (!token) {
        alert('Ação não permitida pelo usuário!')
        return;
      }

      const user = {
        dataent: form.get('dataent'),
 
      };
      console.log(user);

      await fetch('http://localhost:8081/livros', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      // console.log(user);
      route.push('/system/books')

    } catch (e) {
      console.error('Erro ao adicionar registro:', e)
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" isDismissable={false} isKeyboardDismissDisabled={true}>
        <form action={handleAddUser} method="post">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-lg">Renovar</ModalHeader>
                <ModalBody>

                  <Input
                        label="Nova Data de Devolução"
                        type="Date"
                        placeholder="Digite a data"
                        variant="bordered"
                        name="dataent"
                  />

  
                  {/* <button type="submit">Cadastrar</button> */}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={handleClose}>
                    Cancelar
                  </Button>
                  <Button color="primary" type="submit">
                    Renovar
                  </Button>

                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
