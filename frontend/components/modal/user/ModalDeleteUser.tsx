'use client'

import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, user } from "@nextui-org/react";
import { useJwtToken } from "@/hooks/useJwtToken";

import { useRouter } from 'next/navigation'

export default function ModalDeleteUser({ isOpen, onClose, userID }: any) {

  const router = useRouter()
  // Get token
  const token = useJwtToken();

  const [userId, setUserId] = useState<number | null>(null)

  useEffect(() => {
    setUserId(userID)
  }, [userID])

  // Delete (DELETE) user
  async function handleDeleteUser() {
    try {
      if (!token) {
        alert('Ação não permitida pelo usuário!');
        return;
      }

      const res = await fetch(`http://192.168.7.22:8081/leitores/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        onClose()
      } 
      // else {
      //   const errorData = await res.json();
      //   console.error('Erro ao deletar usuário:', errorData);
      // }

    } catch (e) {
      console.error('Erro ao deletar usuário:', e);
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-lg">
                Deletar informações do leitor
              </ModalHeader>
              <ModalBody>
                <p className="uppercase text-xl">Você realmente deseja deletar os dados do leitor?</p>
              </ModalBody>
              <ModalFooter className="flex flex-row justify-end">
                <Button color="danger" variant="flat" onPress={handleDeleteUser}>
                  Deletar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}