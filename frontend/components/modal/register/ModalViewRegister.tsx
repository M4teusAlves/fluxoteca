import { ReactNode } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

interface IModal {
  isOpen: boolean,
  onClose: () => void,
  register: register | null,
}

export default function ModalViewRegister({ isOpen, onClose, register }: IModal) {
  // Close modal
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" isDismissable={false} isKeyboardDismissDisabled={true}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-lg">
                  Detalhes do empréstimo
                </ModalHeader>
                <ModalBody>
                  <h1 className='border-b'>{register?.exemplar.livro.nome} - {register?.exemplar.id}</h1>
                  <p>Localização: {register?.exemplar.localizacao}</p>
                  <div>
                    <h2 className='mb-1'><b>Dados do leitor</b></h2>
                    <p>Nome: {register?.leitor.nome}</p>
                    <p>Endereço: {register?.leitor.endereco}</p>
                    <p>Email: {register?.leitor.email}</p>
                    <p>Telefone: {register?.leitor.telefone}</p>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" variant="flat" onPress={handleClose}>
                    Voltar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
      </Modal>
    </>
  )
}