import React, { useRef, useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useJwtToken } from "@/hooks/useJwtToken";

import { DateTime } from "next-auth/providers/kakao";

export default function ModalRegister({ isOpen, onClose }: any) {
  const formRef = useRef<HTMLFormElement>(null);
  const [showMessage, setShowMessage] = useState(false);
  const messageConfirmation = 'Cadastrado com sucesso.';
  const [errors, setErrors] = useState<{ nomeLeitor?: string, nomeLivro?: string, dataEntrega?: DateTime }>({});
  const [authors, setAuthors] = useState<Array<{ nome?: string; endereco?: string; email?: string; afiliacao?: string; dataNascimento?: string; telefone?: string }>>([]);
  const [categories, setCategories] = useState<Array<{ id: string; nome: string; categoria: string; autor: string; status: string }>>([]);

  const [name, setName] = useState('');
  const [livro, setCategory] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  // Get token
  const token = useJwtToken();

  // Fetch authors and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resReaders = await fetch('http://localhost:8081/leitores', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const resBooks = await fetch('http://localhost:8081/livros', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (resReaders.ok && resBooks.ok) {
          const dataAuthors = await resReaders.json();
          const dataCategories = await resBooks.json();
          setAuthors(dataAuthors);
          setCategories(dataCategories);
        }
      } catch (error) {
        console.error("Error fetching books or readers:", error);
      }
    };

    fetchData();
  }, [token]);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {} as { nomeLeitor?: string, nomeLivro?: string, dataEntrega?: DateTime };

    if (!name) {
      newErrors.nomeLeitor = 'Campo obrigatório.';
    }

    if (!livro) {
      newErrors.nomeLivro = 'Campo obrigatório.';
    }

    if (!deliveryDate) {
      newErrors.dataEntrega = 'Campo obrigatório.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Close modal
  const handleClose = () => {
    onClose();
  };

  // POST register
  async function handleAddRegister() {
    try {
      if (!token) {
        alert('Ação não permitida pelo usuário!');
        return;
      }

      if (!validateForm()) {
        return;
      }

      const register = {
        nomeLeitor: parseInt(name),
        nomeLivro: parseInt(livro),
        dataEntrega: deliveryDate,
      };

      console.log(register)

      const res = await fetch('http://localhost:8081/emprestimos', {
        method: 'POST',
        body: JSON.stringify(register),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setShowMessage(true);
        formRef.current?.reset();
        setName('');
        setCategory('');
        setDeliveryDate('');
        setTimeout(() => setShowMessage(false), 3000);
      }

    } catch (e) {
      console.error('Erro ao adicionar registro:', e);
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" isDismissable={false} isKeyboardDismissDisabled={true}>
        <form onSubmit={(e) => { e.preventDefault(); handleAddRegister(); }} ref={formRef}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-lg">
                  Novo empréstimo
                  {showMessage && <p className="text-green-600 text-sm fixed mt-7">{messageConfirmation}</p>}
                </ModalHeader>
                <ModalBody>

                  <div> {/* Author Input */}
                    {errors.nomeLeitor && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.nomeLeitor}</p>}
                    <Select
                      label="Leitor"
                      placeholder="Selecione o nome do leitor"
                      variant="bordered"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    > 
                      {authors.map((author, index) => (
                        <SelectItem key={index} value={author.nome}>
                          {author.nome}
                        </SelectItem>
                      ))}
                    </Select>
                    
                  </div>

                  <div> {/* Category Input */}
                    {errors.nomeLivro && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.nomeLivro}</p>}
                    <Select
                      label="Livro"
                      placeholder="Selecione o Livro"
                      variant="bordered"
                      value={livro}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((livro) => (
                        <SelectItem key={livro.id} value={livro.nome}>
                          {livro.nome}
                        </SelectItem>
                      ))}
                    </Select>
                  
                  </div>
                  
                  <div> {/* Delivery Date Input */}
                    {errors.dataEntrega && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.dataEntrega}</p>}
                    <Input
                      label="Data de Entrega"
                      type="date"
                      placeholder="Selecione a data de entrega"
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
                    Cadastrar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
      
    
    </>
  );
}
