'use client'

import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, user } from "@nextui-org/react";
import { useJwtToken } from "@/hooks/useJwtToken";

import { useRouter } from 'next/navigation'

export default function ModalAddExemplar({ isOpen, onClose, bookID }: any) {
  const [exemplarID, setExemplarID] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState<{ id?: string }>({});
  const [showMessageConfimation, setShowMessageConfirmation] = useState(false);
  const messageConfirmation = 'Cadastrado com sucesso.';
  const [showMessageError, setShowMessageError] = useState(false);
  const messageError = 'Exemplar já cadastrado.';

  // Get token
  const token = useJwtToken();


  const validateForm = () => {
    const newErrors = {} as { id?: string };

    if (!exemplarID) {
      newErrors.id = 'Campo obrigatório.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleAddExemplar() {
    try {
      if (!token) {
        alert('Ação não permitida pelo usuário!');
        return;
      }

      if(!validateForm()){
        return
      }

      if(location.length===0){
          setLocation("Padrão")
      }

      const exemplar = {
        id: exemplarID,
        livroId: parseInt(bookID),
        localizacao: location
      };

      console.log(exemplar)

      const res = await fetch('http://localhost:8081/exemplares', {
        method: 'POST',
        body: JSON.stringify(exemplar),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setShowMessageConfirmation(true)
        setTimeout(() => setShowMessageConfirmation(false), 3000);
      }else{
        setShowMessageError(true)
        setTimeout(() => setShowMessageError(false), 3000);
      }

    } catch (e) {
      console.error('Erro ao adicionar exemplar:', e);
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-lg">
                Cadastro de exemplar
                {showMessageConfimation && <p className="text-green-600 text-sm fixed mt-7">{messageConfirmation}</p>}
                {showMessageError && <p className="text-red-600 text-sm fixed mt-7">{messageError}</p>}
              </ModalHeader>
              <ModalBody>

                <div> {/* Exemplar ID Input */}
                  {errors.id && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.id}</p>}
                  <Input
                    autoFocus
                    label="Identificador do exemplar"
                    type="number"
                    placeholder="Digite o identificador"
                    variant="bordered"
                    // value={exemplarID}
                    onChange={(e) => setExemplarID(e.target.value.toString())}
                  />
                </div>

                <div> {/* Location Name Input */}
                  {/* {errors.name && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.name}</p>} */}
                  <Input
                    autoFocus
                    label="Localização do livro"
                    type="text"
                    placeholder="Digite a localização do livro"
                    variant="bordered"
                    // value={locationName}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

              </ModalBody>
              <ModalFooter className="flex flex-row justify-end">
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" variant="flat" onPress={handleAddExemplar}>
                  Adicionar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}