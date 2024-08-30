import { fetchExemplar } from "@/components/exemplars/dataExemplar";
import { fetchBook } from "@/components/table/databook";
import { useJwtToken } from "@/hooks/useJwtToken";
import { Accordion, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useRef, useState } from "react";

export default function ModalUpdate({ isOpen, onClose, bookID }: any){

    const formRef = useRef<HTMLFormElement>(null);

    const [showMessage, setShowMessage] = useState(false);

    const [errors, setErrors] = useState<{ nome?: string; observacao?: string;}>({});

    
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)

    const token = useJwtToken()

    const [bookData, setBookData] = useState<Book>({
        id:0,
        nome:"",
        observacao:"",
        categoria:"",
        autor:"",
        status:false,
        exemplares:[]
    });

    const isInvalidNome = React.useMemo(() => {
      if (bookData.nome.length<3 || bookData.nome.length>40) return true

      return false
  
    }, [bookData.nome]);

    const isInvalidObservacao = React.useMemo(() => {
      if (bookData.observacao)
        if (bookData.observacao.length>200) return true

      return false
  
    }, [bookData.observacao]);


    const validateForm = (form: FormData) => {
        const newErrors = {} as { nome?: string; observacao?: string;}
    
        if (!form.get('nome')) {
          newErrors.nome = 'Campo obrigatório.'
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      }



    async function handleUpdateBook(form: FormData) {

        try {
          if (!token) {
            alert('Ação não permitida pelo usuário!')
            return;
          }

          if (!validateForm(form)) {
            return;
          }
    
          
          const book = {
            id: bookID,
            nome: form.get('nome'),
            observacao: form.get('observacao')
          };
    
          const bookJSON = JSON.stringify(book);
          console.log(bookJSON)

          setLoading(true)
    
          const res = await fetch(`http://localhost:8081/livros`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: bookJSON,
          })

          setLoading(false)
    
          if (res.ok) {
            setShowMessage(true)
            setTimeout(() => setShowMessage(false), 3000)
          }
    
        } catch (e) {
          console.error('Erro ao atualizar dados do livro:', e)
        }
      }

    useEffect(() => {
        const fetchData = async () => {
        try {
            if (!token) return;
            const bookData = await fetchBook(token, router, bookID)
            setBookData(bookData)
        } catch (error) {
            console.error("Error fetching book:", error);
        }
        };
    
        fetchData();
    }, [token, isLoading]);

    return(
        <>
            <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" isDismissable={false} isKeyboardDismissDisabled={true}>
                <form action={handleUpdateBook} method="put" ref={formRef}>
                    <ModalContent>
                        {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-lg">
                                Atualizar Livro
                                {showMessage && <p className="text-green-600 text-sm fixed mt-7">Dados Atualizados</p>}
                            </ModalHeader>
                            <ModalBody className="flex">

                                <div> {/* Name Input */}
                                    {errors.nome && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.nome}</p>}
                                    <Input
                                    value={bookData.nome}
                                    label="Nome"
                                    placeholder="Digite o Nome"
                                    isInvalid = {isInvalidNome}
                                    required = {true}
                                    errorMessage = {isInvalidNome ? "O nome precisa ter de 3 a 40 caracteres" : "" }
                                    variant="bordered"
                                    name="nome"
                                    onChange={(e) => setBookData({ ...bookData, nome: e.target.value })}
                                    />
                                </div>

                                <div> {/* Observation Input */}
                                    <Textarea
                                    value={bookData.observacao}
                                    label="Observação"
                                    placeholder="Digite a observação"
                                    isInvalid = {isInvalidObservacao}
                                    required = {true}
                                    errorMessage = {isInvalidObservacao ? "A observação pode ter no máximo 200 caracteres" : "" }
                                    variant="bordered"
                                    name="observacao"
                                    onChange={(e) => setBookData({ ...bookData, observacao: e.target.value })}
                                    />
                                </div>
                        

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="primary" type="submit" disabled = {isInvalidNome && isInvalidObservacao}>
                                    Atualizar
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