import { fetchDeleteBook } from "@/components/table/databook";
import { useJwtToken } from "@/hooks/useJwtToken";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";


export default function ModalDeleteBook({ isOpen, onClose, bookID }: any){

    const router = useRouter();
    const token = useJwtToken();

    async function deleteBook(id:string) {
        try {
          await fetchDeleteBook(token, router, id);
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
                        Cadastro de exemplar
                    </ModalHeader>
                    <ModalBody>

                    <p>Tem certeza que deseja deletar esse livro? </p>

                    </ModalBody>
                    <ModalFooter className="flex flex-row justify-end">
                        <Button color="danger" variant="flat" onPress={()=>{
                            deleteBook(bookID.toString())
                            onClose() }}>
                        Deletar livro
                        </Button>
                    </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}