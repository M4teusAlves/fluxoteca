import React, { useRef, useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select } from "@nextui-org/react";
import { useJwtToken } from "@/hooks/useJwtToken";
import ModalAddAuthor from "./ModalAutor";
import ModalAddCategory from "./ModalCategoria";
import { DateTime } from "next-auth/providers/kakao";

export default function ModalRegister({ isOpen, onClose }: any) {
  const formRef = useRef<HTMLFormElement>(null);
  const [showMessage, setShowMessage] = useState(false);
  const messageConfirmation = 'Cadastrado com sucesso.';
  const [errors, setErrors] = useState<{ nomeLeitor?: string, nomeLivro?: string, dataEntrega?: DateTime }>({});
  const [authors, setAuthors] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [showAddAuthorModal, setShowAddAuthorModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const [name, setName] = useState('');
  const [livro, setCategory] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  // Get token
  const token = useJwtToken();

  // Fetch authors and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resReaders = await fetch('http://localhost:8081/leitores');
        const resBooks = await fetch('http://localhost:8081/livros');
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
  }, []);

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
        nomeLeitor: name,
        nomeLivro: livro,
        dataEntrega: deliveryDate,
      };

      const res = await fetch('http://localhost:8081/registros', {
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
                  Cadastro de Registro
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
                      onChange={(value) => setName(value)}
                    >
                      {authors.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </Select>
                    <Button onPress={() => setShowAddAuthorModal(true)}>Adicionar Leitor</Button>
                  </div>

                  <div> {/* Category Input */}
                    {errors.nomeLivro && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.nomeLivro}</p>}
                    <Select
                      label="Livro"
                      placeholder="Selecione o Livro"
                      variant="bordered"
                      value={livro}
                      onChange={(value) => setCategory(value)}
                    >
                      {categories.map((livro) => (
                        <option key={livro} value={livro}>
                          {livro}
                        </option>
                      ))}
                    </Select>
                    <Button onPress={() => setShowAddCategoryModal(true)}>Adicionar Livro</Button>
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
      {showAddAuthorModal && <ModalAddAuthor isOpen={showAddAuthorModal} onClose={() => setShowAddAuthorModal(false)} onAuthorAdded={(authorName) => {
        setAuthors([...authors, authorName]);
        setName(authorName);
        setShowAddAuthorModal(false);
      }} />}
      {showAddCategoryModal && <ModalAddCategory isOpen={showAddCategoryModal} onClose={() => setShowAddCategoryModal(false)} onCategoryAdded={(categoryName) => {
        setCategories([...categories, categoryName]);
        setCategory(categoryName);
        setShowAddCategoryModal(false);
      }} />}
    </>
  );
}
