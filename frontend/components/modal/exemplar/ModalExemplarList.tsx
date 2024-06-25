import { fetchExemplarsByBook } from "@/components/exemplars/dataExemplar";
import { useJwtToken } from "@/hooks/useJwtToken";
import { Accordion, AccordionItem, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ModalExemplarList({ isOpen, onClose, bookID }: any){

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const token = useJwtToken()
    const [exemplars, setExemplars] = useState<exemplar[]>([])

    useEffect(() => {
        const fetchData = async () => {
        try {
            if (!token) return;
            const exemplarsData = await fetchExemplarsByBook(token, router, bookID)
            setExemplars(exemplarsData)
        } catch (error) {
            console.error("Error fetching users:", error);
        }
        };
    
        fetchData();
    }, [token, isLoading]);

    return(
        <>
            <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-lg">
                            Lista de exemplares
                        </ModalHeader>
                        <ModalBody className="flex">

                            <b>Número de exemplares: {exemplars.length}</b>

                            <Accordion variant="splitted">
                                {exemplars.map((exemplar)=>(
                                    <AccordionItem key={exemplar.id} title={exemplar.id}>
                                    <b>Livro</b>
                                    <p>{exemplar.livro.nome}</p>
                                    <b>Localização</b>
                                    <p>{exemplar.localizacao}</p>
                                    <b>Estado</b>
                                    <p>{exemplar.estado}</p>
                            
                                    </AccordionItem>
                                ))}
                            </Accordion>

                        </ModalBody>
                        <ModalFooter>
                        </ModalFooter>
                    </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}