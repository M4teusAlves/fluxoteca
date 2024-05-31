
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, user } from "@nextui-org/react";
import { MailIcon } from '../MailIcon.jsx';

import { useRef } from "react";


import { User } from "@/lib/types.js";
import { useJwtToken } from "@/hooks/useJwtToken";
// import { handleAddUser } from "@/app/system/users/postUser";

export default function ModalUser({ isOpen, onClose }: any) {
  const formRef =  useRef<HTMLFormElement>(null);
  const [showMessage, setShowMessage] = useState(false);
  const messageConfirmation = 'Cadastrado com sucesso.'
  const [errors, setErrors] = useState<{ nome?: string; endereco?: string; email?: string; afiliacao?: string; dataNascimento?: string; telefone?: string}>({});

  const validateForm = (form: FormData) => {
    const newErrors = {} as { nome?: string; endereco?: string; email?: string; afiliacao?: string; dataNascimento?: string; telefone?: string}

    if(!form.get('nome')){
      newErrors.nome = 'Campo obrigatório.'
    }
    if(!form.get('endereco')){
      newErrors.endereco = 'Campo obrigatório.'
    }
    if(!form.get('email')){
      newErrors.email = 'Campo obrigatório.'
    }
    if(!form.get('afiliacao')){
      newErrors.afiliacao = 'Campo obrigatório.'
    }
    if(!form.get('dataNascimento')){
      newErrors.dataNascimento = 'Campo obrigatório.'
    }
    if(!form.get('telefone')){
      newErrors.telefone = 'Campo obrigatório.'
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

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

      if(!validateForm(form)){
        return;
      }

      const user = {
        nome: form.get('nome'),
        endereco: form.get('endereco'),
        email: form.get('email'),
        afiliacao: form.get('afiliacao'),
        dataNascimento: form.get('dataNascimento'),
        telefone: form.get('telefone'),
      };

      const res = await fetch('http://localhost:8081/leitores', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.ok) {
        setShowMessage(true)
        // alert('Cadastrado com sucesso!')
        formRef.current?.reset();
        setTimeout(() => setShowMessage(false), 3000)
      }

    } catch (e) {
      console.error('Erro ao adicionar usuário:', e)
    }
  }

  // const handleClick = () => {

  // }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" isDismissable={false} isKeyboardDismissDisabled={true}>
        <form action={handleAddUser} method="post" ref={formRef}>
          <ModalContent>
            {(onClose) => (
              <> 
                <ModalHeader className="flex flex-col gap-1 text-lg">
                  Cadastro de Leitor
                  {showMessage && <p className="text-green-600 text-sm fixed mt-7">{messageConfirmation}</p>}
                  </ModalHeader>
                <ModalBody>
                  {/* Name Input */}
                  <Input
                    label="Nome"
                    type="text"
                    placeholder="Digite o nome"
                    variant="bordered"
                    name="nome"
                  />
                  {errors.nome && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.nome}</p>}
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
                  {/* Affiliation Input */}
                  <Input
                    autoFocus
                    label="Afiliação"
                    // placeholder="leitor@gmail.com"
                    variant="bordered"
                    name="afiliacao"
                  />
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
