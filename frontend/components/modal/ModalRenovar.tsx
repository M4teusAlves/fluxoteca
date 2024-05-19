
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { MailIcon } from './MailIcon.jsx';

import { User } from "@/lib/types.js";
import { useJwtToken } from "@/hooks/useJwtToken";
// import { handleAddUser } from "@/app/system/users/postUser";

export default function ModalUser({ isOpen, onClose }: any) {

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
        nome: form.get('nome'),
        categoria: form.get('categoria'),
        autor: form.get('autor'),
 
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
                <ModalHeader className="flex flex-col gap-1 text-lg">Cadastro de Registro</ModalHeader>
                <ModalBody>

                  {/* Name Input */}
                  <Input
                    label="Nome do livro"
                    type="text"
                    placeholder="Digite o nome do livro"
                    variant="bordered"
                    name="nome"
                  />
                  {/* Address Input */}
                  <Input
                    label="Nome do Usuário"
                    type="text"
                    placeholder="Digite o nome do Usuário"
                    variant="bordered"
                    name="categoria"
                  />
                  {/* Email Input */}
                  <Input
                        label="Data do Emprestimo"
                        type="Date"
                        placeholder="Digite o autor do livro"
                        variant="bordered"
                        name="autor"
                  />
                  <Input
                        label="Data de Devolução"
                        type="Date"
                        placeholder="Digite o autor do livro"
                        variant="bordered"
                        name="autor"
                  />

  
                  {/* <button type="submit">Cadastrar</button> */}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={handleClose}>
                    Cancelar
                  </Button>
                  <Button color="primary" type="submit">
                    Cadastrar
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
