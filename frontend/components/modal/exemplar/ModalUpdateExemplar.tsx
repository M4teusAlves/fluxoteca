import { fetchExemplar } from "@/components/exemplars/dataExemplar";
import { useJwtToken } from "@/hooks/useJwtToken";
import { Accordion, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useRef, useState } from "react";

export default function ModalUpdateExemplar({ isOpen, onClose, exemplarID }: any){

    const formRef = useRef<HTMLFormElement>(null);

    const [showMessage, setShowMessage] = useState(false);

    const [errors, setErrors] = useState<{ localizacao?: string; estado?: string;}>({});

    
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)

    const token = useJwtToken()

    const [exemplarData, setExemplarData] = useState<exemplar>({
        id:"",
        localizacao:"",
        livro:{id:0,nome:""},
        estado:"",
        status:true,
    });

    const isInvalid = React.useMemo(() => {
      if (exemplarData.localizacao.length<3 || exemplarData.localizacao.length>40) return true

      return false
  
    }, [exemplarData.localizacao]);


    const validateForm = (form: FormData) => {
        const newErrors = {} as { localizacao?: string; estado?: string;}
    
        if (!form.get('localizacao')) {
          newErrors.localizacao = 'Campo obrigatório.'
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      }



    async function handleUpdateExemplar(form: FormData) {

        try {
          if (!token) {
            alert('Ação não permitida pelo usuário!')
            return;
          }

          if (!validateForm(form)) {
            return;
          }
    
          
          const exemplar = {
            id: exemplarID,
            localizacao: form.get('localizacao'),
            estado: form.get('estado')
          };
    
          const exemplarJSON = JSON.stringify(exemplar);
          console.log(exemplarJSON)

          setLoading(true)
    
          const res = await fetch(`http://localhost:8081/exemplares`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: exemplarJSON,
          })

          setLoading(false)
    
          if (res.ok) {
            setShowMessage(true)
            setTimeout(() => setShowMessage(false), 3000)
          }
    
        } catch (e) {
          console.error('Erro ao atualizar dados do usuário:', e)
        }
      }

    useEffect(() => {
        const fetchData = async () => {
        try {
            if (!token) return;
            const exemplarsData = await fetchExemplar(token, router, exemplarID)
            setExemplarData(exemplarsData)
        } catch (error) {
            console.error("Error fetching users:", error);
        }
        };
    
        fetchData();
    }, [token, isLoading]);

    return(
        <>
            <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" isDismissable={false} isKeyboardDismissDisabled={true}>
                <form action={handleUpdateExemplar} method="put" ref={formRef}>
                    <ModalContent>
                        {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-lg">
                                Atualizar Exemplar
                                {showMessage && <p className="text-green-600 text-sm fixed mt-7">Dados Atualizados</p>}
                            </ModalHeader>
                            <ModalBody className="flex">

                                <div> {/* Localization Input */}
                                    {errors.localizacao && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.localizacao}</p>}
                                    <Input
                                    value={exemplarData.localizacao}
                                    label="Localização"
                                    placeholder="Digite a localização"
                                    isInvalid = {isInvalid}
                                    required = {true}
                                    errorMessage = {isInvalid ? "A mensagem precisa ter de 3 a 40 caracteres" : "" }
                                    variant="bordered"
                                    name="localizacao"
                                    onChange={(e) => setExemplarData({ ...exemplarData, localizacao: e.target.value })}
                                    />
                                </div>
                        
                                <div>
                                    <Select
                                    value={exemplarData.estado}
                                    label="Estado"
                                    name="estado"
                                    onChange={(e)=>setExemplarData({...exemplarData, estado: e.target.value})}
                                    >
                                        <SelectItem key={"DISPONIVEL"}>Disponível</SelectItem>
                                        <SelectItem key={"EMPRESTADO"}>Emprestado</SelectItem>
                                        <SelectItem key={"PERDIDO"}>Perdido</SelectItem>
                                    </Select>
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="primary" type="submit" disabled = {isInvalid}>
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