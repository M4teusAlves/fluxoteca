import { useJwtToken } from "@/hooks/useJwtToken";
import { useRef, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { putRegister } from "@/components/table/dataregister";

interface IModal {
  isOpen: boolean,
  onClose: () => void,
  registerID: number,
}

export default function ModalEditRegister({ isOpen, onClose, registerID }: IModal) {
  // Get token
  const token = useJwtToken();

  // Set mín date to select on date input
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Close modal
  const handleClose = () => {
    onClose();
  };

  const formRef = useRef<HTMLFormElement>(null);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const messageConfirmation = 'Dados atualizados com sucesso.'

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    try {
      const res: boolean | undefined = await putRegister(token, registerID, deliveryDate);
      
      if (res === true) { // Checking explicitly for true
        setShowMessage(true);
        formRef.current?.reset();
        setDeliveryDate('');
        setTimeout(() => setShowMessage(false), 3000);
      } else {
        // Handle other cases if needed
      }
    } catch (error) {
      console.error('Error while submitting:', error);
      // Handle error if needed
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" isDismissable={false} isKeyboardDismissDisabled={true}>
        <form onSubmit={handleSubmit} ref={formRef}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-lg">
                  Alterar data de devolução
                  {showMessage && <p className="text-green-600 text-sm fixed mt-7">{messageConfirmation}</p>}
                </ModalHeader>
                <ModalBody>

                  <div> {/* Delivery Date Input */}
                    <Input
                      label="Data de devolução"
                      type="date"
                      min={minDate}
                      placeholder="Selecione uma nova data "
                      variant="bordered"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                    />
                  </div>

                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={handleClose}>
                    Cancelar
                  </Button>
                  <Button color="primary" type="submit">
                    Confirmar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>


    </>
  )
}