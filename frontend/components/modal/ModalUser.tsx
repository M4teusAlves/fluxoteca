
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
        tipo: 'LEITOR',
        nome: form.get('nome'),
        endereco: form.get('endereco'),
        email: form.get('email'),
        // afiliacao: form.get('afiliacao')!.toString(),
        dataNascimento: form.get('dataNascimento'),
        telefone: form.get('telefone'),
      };

      await fetch('http://localhost:8081/usuarios', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      console.log(user);
      route.push('/system/users')

    } catch (e) {
      console.error('Erro ao adicionar usuário:', e)
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" isDismissable={false} isKeyboardDismissDisabled={true}>
        <form action={handleAddUser} method="post">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-lg">Cadastro de Leitor</ModalHeader>
                <ModalBody>

                  {/* Name Input */}
                  <Input
                    label="Nome"
                    type="text"
                    placeholder="Digite o nome"
                    variant="bordered"
                    name="nome"
                  />
                  {/* Address Input */}
                  <Input
                    label="Endereço"
                    placeholder="Digite o endereço"
                    variant="bordered"
                    name="endereco"
                  />
                  {/* Email Input */}
                  <Input
                    autoFocus
                    endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                    label="Email"
                    placeholder="leitor@gmail.com"
                    variant="bordered"
                    name="email"
                  />
                  {/* Affiliation Select */}
                  {/* <select
                    label="Afiliação"
                    required
                    options={[
                      { value: "Filho", label: "Filho" },
                      { value: "Pai", label: "Pai" },
                      { value: "Mãe", label: "Mãe" },
                      { value: "Outro", label: "Outro" },
                    ]}
                  /> */}
                  {/* Date of Birth Input */}
                  <Input label="Data Nascimento" variant="bordered" type="date" name="dataNascimento" />
                  {/* Phone Number Input */}
                  <Input label="Telefone" placeholder="(DDD)9xxxxxxxx" variant="bordered" name="telefone" />
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
