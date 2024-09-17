import { fetchExemplar } from "@/components/exemplars/dataExemplar";
import { fetchUser } from "@/components/users/dataUsers";
import { useJwtToken } from "@/hooks/useJwtToken";
import { Accordion, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useRef, useState } from "react";

export default function ModalUpdateUser({ isOpen, onClose, userID }: any){

    const formRef = useRef<HTMLFormElement>(null);

    const [showMessage, setShowMessage] = useState(false);

    const [errors, setErrors] = useState<{ login?: string; senha?:string;}>({});

    const [senha, setSenha] = useState("")

    
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)

    const token = useJwtToken()

    const [userData, setUserData] = useState<user>({
        id:0,
        login:"",
        tipo:"",
        status:true
    });

    const isInvalid = React.useMemo(() => {
      if (!userData?.login) return true;
        return userData.login.length < 3 || userData.login.length > 20;
    }, [userData?.login]);

  

    const isInvalidPassword = React.useMemo(() => {
      if (senha.length<8 || senha.length>15) return true

      return false
  
    }, [senha]);


    const validateForm = (form: FormData) => {
        const newErrors = {} as { login?: string; senha?: string;}
    
        if (!form.get('login')) {
          newErrors.login = 'Campo obrigatório.'
        }

        if (!form.get('senha')) {
          newErrors.senha = 'Campo obrigatório.'
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      }



    async function handleUpdateUser(form: FormData) {

        try {
          if (!token) {
            alert('Ação não permitida pelo usuário!')
            return;
          }

          if (!validateForm(form)) {
            return;
          }
    
          
          const user = {
            id: userID,
            login: form.get('login'),
            senha: form.get('senha')
          };
    
          const userJSON = JSON.stringify(user);

          setLoading(true)
    
          const res = await fetch(`http://localhost:8081/usuarios`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: userJSON,
          })

          setLoading(false)
    
          if (res.ok) {
            setShowMessage(true)
            setTimeout(() => setShowMessage(false), 3000)
            console.log(res)
            localStorage.setItem('jwtToken', "")
            localStorage.setItem('login', "")
            localStorage.setItem('tipo', "")
            router.push("/signin")
          }
    
        } catch (e) {
          console.error('Erro ao atualizar dados do usuário:', e)
        }
      }

    useEffect(() => {
        const fetchData = async () => {
        try {
            if (!token) return;
            const usersData = await fetchUser(token, router, userID)
            setUserData(usersData)
        } catch (error) {
            console.error("Error fetching users:", error);
        }
        };
    
        fetchData();
    }, [token, isLoading]);

    return(
        <>
            <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" isDismissable={false} isKeyboardDismissDisabled={true}>
                <form action={handleUpdateUser} method="put" ref={formRef}>
                    <ModalContent>
                        {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-lg">
                                Atualizar Exemplar
                                {showMessage && <p className="text-green-600 text-sm fixed mt-7">Dados Atualizados</p>}
                            </ModalHeader>
                            <ModalBody className="flex">

                                <div> {/* Localization Input */}
                                    {errors.login && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.login}</p>}
                                    <Input
                                    value={userData?.login}
                                    label="Login"
                                    placeholder="Digite a login"
                                    isInvalid = {isInvalid}
                                    required = {true}
                                    errorMessage = {isInvalid ? "O login precisa ter de 3 a 20 caracteres" : "" }
                                    variant="bordered"
                                    name="login"
                                    onChange={(e) => setUserData({ ...userData, login: e.target.value })}
                                    />
                                </div>

                                <div>
                                    {errors.senha && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.senha}</p>}
                                    <Input
                                    value={senha}
                                    label="Senha"
                                    placeholder="Digite uma nova senha"
                                    isInvalid = {isInvalidPassword}
                                    required = {true}
                                    errorMessage = {isInvalidPassword ? "A senha precisa ter de 8 a 15 caracteres" : "" }
                                    variant="bordered"
                                    name="senha"
                                    onChange={(e) => setSenha(e.target.value)}
                                    />
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