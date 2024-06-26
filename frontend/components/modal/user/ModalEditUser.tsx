import React, { useRef } from "react";
import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useJwtToken } from "@/hooks/useJwtToken";
import ModalDeleteUser from "./ModalDeleteUser";

export default function ModalEditUser({ isOpen, onClose, userID }: any) {
  const formRef = useRef<HTMLFormElement>(null);

  const [showMessage, setShowMessage] = useState(false);
  const messageConfirmation = 'Dados atualizados com sucesso.'

  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  const [errors, setErrors] = useState<{ nome?: string; endereco?: string; email?: string; afiliacao?: string; dataNascimento?: string; telefone?: string }>({});

  const [phoneNumber, setPhoneNumber] = useState('');
  const [userData, setUserData] = useState<{ nome?: string; endereco?: string; email?: string; afiliacao?: string; dataNascimento?: string; telefone?: string }>({});

  const [userId, setUserId] = useState<number | null>(null)

  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

  useEffect(() => {
    setUserId(userID)
  }, [userID])

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
    // format the number using regex (DDD) 9 9999-9999
    return digits.slice(0, 12).replace(/(\d{3})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
  };

  const handlePhoneInput = (event: any) => {
    setUserData({ ...userData, telefone: event.target.value })

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

  const handleClickDeleteUser = () => {
    setShowModalDeleteUser(true);
  };
  
  // Update (PUT) user
  async function handleUpdateUser(form: FormData) {

    try {
      if (!token) {
        alert('Ação não permitida pelo usuário!')
        return;
      }

      if (!validateForm(form)) {
        return;
      }

      const user = {
        id: userID,
        nome: form.get('nome'),
        endereco: form.get('endereco'),
        email: form.get('email'),
        afiliacao: form.get('afiliacao'),
        dataNascimento: form.get('dataNascimento'),
        telefone: form.get('telefone'),
      };

      const userJSON = JSON.stringify(user);
      // console.log(userJSON)

      const res = await fetch(`http://192.168.7.22:8081/leitores`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: userJSON,
      })

      if (res.ok) {
        setShowMessage(true)
        setTimeout(() => setShowMessage(false), 3000)
      }

    } catch (e) {
      console.error('Erro ao atualizar dados do usuário:', e)
    }
  }

  // Read (GET) user
  useEffect(() => {
    async function fetchUserData() {
      try {
        if (token) { // Check if token is valid before fetching data
          const res = await fetch(`http://192.168.7.22:8081/leitores/${userID}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          setUserData(data);
        }
      } catch (e) {
        console.error('Erro ao obter usuário:', e)
      }

    }

    fetchUserData();
  }, [userID, token]); // Fetch data when userID or token changes

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" isDismissable={false} isKeyboardDismissDisabled={true}>
        <form action={handleUpdateUser} method="put" ref={formRef}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-lg">
                  Dados do Leitor
                  {showMessage && <p className="text-green-600 text-sm fixed mt-7">{messageConfirmation}</p>}
                  {showDeleteMessage && <p className="text-green-600 text-sm fixed mt-7">Dados do leitor deletado.</p>}
                </ModalHeader>
                <ModalBody>

                  <div> {/* Name Input */}
                    {errors.nome && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.nome}</p>}
                    <Input
                      value={userData.nome}
                      label="Nome"
                      type="text"
                      placeholder="Digite o nome"
                      variant="bordered"
                      name="nome"
                      onChange={(e) => setUserData({ ...userData, nome: e.target.value })} // Update userData on change
                    />
                  </div>

                  <div> {/* Address Input */}
                    {errors.endereco && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.endereco}</p>}
                    <Input
                      value={userData.endereco}
                      label="Endereço"
                      placeholder="Digite o endereço"
                      variant="bordered"
                      name="endereco"
                      onChange={(e) => setUserData({ ...userData, endereco: e.target.value })}
                    />
                  </div>

                  <div> {/* Email Input */}
                    {errors.email && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.email}</p>}
                    <Input
                      value={userData.email}
                      label="Email"
                      placeholder="leitor@gmail.com"
                      variant="bordered"
                      name="email"
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                  </div>

                  <div> {/* Affiliation Input */}
                    {errors.afiliacao && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.afiliacao}</p>}
                    <Input
                      value={userData.afiliacao}
                      label="Afiliação"
                      placeholder="Digite a afiliação"
                      variant="bordered"
                      name="afiliacao"
                      onChange={(e) => setUserData({ ...userData, afiliacao: e.target.value })}
                    />
                  </div>

                  <div> {/* Date of Birth Input */}
                    {errors.dataNascimento && <p className="text-red-500 text-xs absolute right-14 mt-7">{errors.dataNascimento}</p>}
                    <Input
                      isReadOnly
                      value={userData.dataNascimento}
                      label="Data Nascimento"
                      variant="bordered"
                      type="date"
                      name="dataNascimento"
                      onChange={(e) => setUserData({ ...userData, dataNascimento: e.target.value })}
                    />
                  </div>

                  <div> {/* Phone Number Input */}
                    {errors.telefone && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.telefone}</p>}
                    <Input
                      value={userData.telefone}
                      type="tel"
                      label="Telefone"
                      placeholder="(DDD) 9 xxxx - xxxx"
                      variant="bordered"
                      name="telefone"
                      // value={phoneNumber}
                      onChange={handlePhoneInput}
                    />
                  </div>

                </ModalBody>
                <ModalFooter className="flex flex-row justify-between">
                  <Button color="danger" variant="flat" onPress={handleClickDeleteUser}>
                    Deletar
                  </Button>
                  <div className="flex gap-1">
                    <Button color="danger" variant="flat" onPress={handleClose}>
                      Cancelar
                    </Button>
                    <Button color="primary" type="submit">
                      Atualizar
                    </Button>
                  </div>


                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
      {/* Condicional para mostrar modal de confirmação de exclusão de leitor */}
      {showModalDeleteUser && <ModalDeleteUser isOpen={showModalDeleteUser} onClose={() => {
        setShowModalDeleteUser(false)
        // setIsLoading(true);
        // onClose()
      }} userID={userId} />}
    </>
  );
}
