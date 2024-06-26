import { useJwtToken } from "@/hooks/useJwtToken";
import { useRef, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { handleDeleteRegister } from "@/components/table/dataregister";

interface IModal {
  isOpen: boolean,
  onClose: () => void,
  registerID: number,
}

export default function ModalEndRegister({ isOpen, onClose, registerID }: IModal) {
  // Get token
  const token = useJwtToken();

  const [showMessage, setShowMessage] = useState(false);
  const messageConfirmation = 'Empréstimo finalizado com sucesso.'

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
                  Finalizar empréstimo
                  {showMessage && <p className="text-green-600 text-sm fixed mt-7">{messageConfirmation}</p>}
                </ModalHeader>
                <ModalBody>

                  <div> 
                    <p>Confirmar a finalização do empréstimo</p>
                  </div>

                </ModalBody>
                <ModalFooter>
                  <Button color="primary" variant="flat" onPress={handleClose}>
                    Voltar
                  </Button>
                  <Button color="danger" onPress={() => {
                    handleDeleteRegister(token, registerID)
                    setShowMessage(true)
                    setTimeout(() => handleClose(), 1000);
                    }}>
                    Finalizar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
      </Modal>


    </>
  )
}