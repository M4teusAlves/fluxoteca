
import React, { useRef } from "react";
import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useJwtToken } from "@/hooks/useJwtToken";

export default function ModalUser({ isOpen, onClose }: any) {
  const formRef = useRef<HTMLFormElement>(null);
  const [showMessage, setShowMessage] = useState(false);
  const messageConfirmation = 'Cadastrado com sucesso.'
  const [errors, setErrors] = useState<{ nome?: string; endereco?: string; email?: string; afiliacao?: string; dataNascimento?: string; telefone?: string }>({});

  const [phoneNumber, setPhoneNumber] = useState('');
    
  // Get token
  const token = useJwtToken();

  // Validate email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate phone
  const formatPhoneNumber = (phoneNumber: string) => {
    // Remove all non-digit characters
    const digits = phoneNumber.replace(/\D/g, '');
    // format the number using regex (34) 9 9999-9999
    return digits.slice(0, 12).replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
  };

  const handlePhoneInput = (event: any) => {
    const phone = event.target.value;
    const formattedNumber = formatPhoneNumber(phone);
    setPhoneNumber(formattedNumber);
  };

  // Validate form fields
  const validateForm = (form: FormData) => {
    const newErrors = {} as { nome?: string; endereco?: string; email?: string; afiliacao?: string; dataNascimento?: string; telefone?: string }

    if (!form.get('nome')) {
      newErrors.nome = 'Campo obrigatório.'
    }
    if (!form.get('endereco')) {
      newErrors.endereco = 'Campo obrigatório.'
    }
    if (!form.get('email')) {
      newErrors.email = 'Campo obrigatório.'
    } else if (!validateEmail(form.get('email')!.toString())) {
      newErrors.email = 'Email inválido.'
    }
    if (!form.get('afiliacao')) {
      newErrors.afiliacao = 'Campo obrigatório.'
    }
    if (!form.get('dataNascimento')) {
      newErrors.dataNascimento = 'Campo obrigatório.'
    }
    if (!form.get('telefone')) {
      newErrors.telefone = 'Campo obrigatório.'
    } else {

    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Close modal
  const handleClose = () => {
    onClose();
  };

  // POST user
  async function handleAddUser(form: FormData) {

    try {
      if (!token) {
        alert('Ação não permitida pelo usuário!')
        return;
      }

      if (!validateForm(form)) {
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
        formRef.current?.reset();
        setTimeout(() => setShowMessage(false), 3000)
      }

    } catch (e) {
      console.error('Erro ao adicionar usuário:', e)
    }
  }

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

                  <div> {/* Name Input */}
                    {errors.nome && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.nome}</p>}
                    <Input
                      autoFocus
                      label="Nome"
                      type="text"
                      placeholder="Digite o nome"
                      variant="bordered"
                      name="nome"
                    />
                  </div>

                  <div> {/* Address Input */}
                    {errors.endereco && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.endereco}</p>}
                    <Input
                      label="Endereço"
                      placeholder="Digite o endereço"
                      variant="bordered"
                      name="endereco"
                    />
                  </div>

                  <div> {/* Email Input */}
                    {errors.email && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.email}</p>}
                    <Input
                      label="Email"
                      placeholder="leitor@gmail.com"
                      variant="bordered"
                      name="email"
                    />
                  </div>

                  <div> {/* Affiliation Input */}
                    {errors.afiliacao && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.afiliacao}</p>}
                    <Input
                      label="Afiliação"
                      placeholder="Digite a afiliação"
                      variant="bordered"
                      name="afiliacao"
                    />
                  </div>

                  <div> {/* Date of Birth Input */}
                    {errors.dataNascimento && <p className="text-red-500 text-xs absolute right-14 mt-7">{errors.dataNascimento}</p>}
                    <Input
                      label="Data Nascimento"
                      variant="bordered"
                      type="date"
                      name="dataNascimento"
                    />
                  </div>

                  <div> {/* Phone Number Input */}
                    {errors.telefone && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.telefone}</p>}
                    <Input
                      type="tel"
                      label="Telefone"
                      placeholder="(DDD) 9 xxxx - xxxx"
                      variant="bordered"
                      name="telefone"
                      value={phoneNumber}
                      onChange={handlePhoneInput}
                    />
                  </div>

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
