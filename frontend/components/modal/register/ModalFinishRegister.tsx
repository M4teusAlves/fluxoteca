import { fetchFinishRegister } from "@/components/reports/dataReports";
import { useJwtToken } from "@/hooks/useJwtToken";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function ModalFinishRegister({ isOpen, onClose, registerId }: any){
    
    const router = useRouter();
    const token = useJwtToken();

    async function finishRegister(id:string) {
        try {
          await fetchFinishRegister(token, router, id);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
    }

    return(
        <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" isDismissable={false} isKeyboardDismissDisabled={true}>
            <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1 text-lg">
                        Finalizar Empréstimo
                    </ModalHeader>
                    <ModalBody>

                    <p>TEM CERTEZA QUE DESEJA FINALIZAR ESSE EMPRÉSTIMO? </p>

                    </ModalBody>
                    <ModalFooter className="flex flex-row justify-end">
                        <Button color="danger" variant="flat" onPress={()=>{
                            finishRegister(registerId.toString())
                            onClose() }}>
                        Finalizar Empréstimo
                        </Button>
                    </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )   
}