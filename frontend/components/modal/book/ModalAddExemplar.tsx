'use client'

import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, user } from "@nextui-org/react";
import { useJwtToken } from "@/hooks/useJwtToken";

import { useRouter } from 'next/navigation'

export default function ModalAddExemplar({ isOpen, onClose, bookID }: any) {
  const [exemplarID, setExemplarID] = useState('');
  const [location, setLocation] = useState('');

  // Get token
  const token = useJwtToken();

  async function handleAddExemplar() {
    try {
      if (!token) {
        alert('Ação não permitida pelo usuário!');
        return;
      }

      const exemplar = {
        id: exemplarID,
        livroId: parseInt(bookID),
        localizacao: location
      };

      console.log(exemplar)

      const res = await fetch('http://192.168.7.22:8081/exemplares', {
        method: 'POST',
        body: JSON.stringify(exemplar),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        onClose();
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
              </ModalHeader>
              <ModalBody>

                <div> {/* Exemplar ID Input */}
                  {/* {errors.name && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.name}</p>} */}
                  <Input
                    autoFocus
                    label="Identificador do exemplar"
                    type="text"
                    placeholder="Digite o identificador"
                    variant="bordered"
                    // value={exemplarID}
                    onChange={(e) => setExemplarID(e.target.value)}
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
                <Button color="danger" variant="flat" onPress={handleAddExemplar}>
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