import React, { useRef, useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useJwtToken } from "@/hooks/useJwtToken";
import ModalAddAuthor from "./ModalAutor";
import ModalAddCategory from "./ModalCategoria";

export default function ModalBooks({ isOpen, onClose }: any) {
  const formRef = useRef<HTMLFormElement>(null);
  const [showMessage, setShowMessage] = useState(false);
  const messageConfirmation = 'Cadastrado com sucesso.';
  const [errors, setErrors] = useState<{ nome?: string, autor?: string, categoria?: string, observation?: string }>({});
  const [authors, setAuthors] = useState<Array<{ id: number, nome?: string }>>([]);
  const [categories, setCategories] = useState<Array<{ id: number | string, nome?: string }>>([]);
  const [showAddAuthorModal, setShowAddAuthorModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const [name, setName] = useState('');
  const [observation, setObservation] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');

  // Get token
  const token = useJwtToken();

  // Fetch authors and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resAuthors = await fetch('http://localhost:8081/autores', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const resCategories = await fetch('http://localhost:8081/categorias', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (resAuthors.ok && resCategories.ok) {
          const dataAuthors = await resAuthors.json();
          const dataCategories = await resCategories.json();
          setAuthors(dataAuthors);
          setCategories(dataCategories);
        }
      } catch (error) {
        console.error("Error fetching authors or categories:", error);
      }
    };

    fetchData();
  }, [token, authors, categories]);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {} as { nome?: string, autor?: string, categoria?: string, observation?: string };

    if (!name) {
      newErrors.nome = 'Campo obrigatório.';
    }

    if (!author) {
      newErrors.autor = 'Campo obrigatório.';
    }

    if (!category) {
      newErrors.categoria = 'Campo obrigatório.';
    }

    if (!observation){
      newErrors.observation = 'Campo obrigatório'
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Close modal
  const handleClose = () => {
    onClose();
  };

  // POST book
  async function handleAddBook() {
    try {
      if (!token) {
        alert('Ação não permitida pelo usuário!');
        return;
      }

      if (!validateForm()) {
        return;
      }

      const book = {
        nome: name,
        categoria: parseInt(category),
        autor: parseInt(author),
        observacao: observation
      };

      console.log(book)

      const res = await fetch('http://localhost:8081/livros', {
        method: 'POST',
        body: JSON.stringify(book),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setShowMessage(true);
        formRef.current?.reset();
        setName('');
        setAuthor('');
        setCategory('');
        setObservation('')
        setTimeout(() => setShowMessage(false), 3000);
      }

    } catch (e) {
      console.error('Erro ao adicionar livro:', e);
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" isDismissable={false} isKeyboardDismissDisabled={true}>
        <form onSubmit={(e) => { e.preventDefault(); handleAddBook(); }} ref={formRef}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-lg">
                  Cadastro de Livro
                  {showMessage && <p className="text-green-600 text-sm fixed mt-7">{messageConfirmation}</p>}
                </ModalHeader>
                <ModalBody>

                  <div> {/* Name Input */}
                    {errors.nome && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.nome}</p>}
                    <Input
                      autoFocus
                      label="Nome do livro"
                      type="text"
                      placeholder="Digite o nome"
                      variant="bordered"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div> {/* Author Input */}
                    {errors.autor && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.autor}</p>}
                    <Select
                      label="Autor"
                      placeholder="Selecione o autor"
                      variant="bordered"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    >
                      {authors.map((author, index) => (
                        <SelectItem key={author.id} value={author.id}>
                          {author.nome}
                        </SelectItem>
                      ))}
                    </Select>
                    <Button onPress={() => setShowAddAuthorModal(true)}>Adicionar Autor</Button>
                  </div>

                  <div> {/* Category Input */}
                    {errors.categoria && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.categoria}</p>}
                    <Select
                      label="Categoria"
                      placeholder="Selecione a categoria"
                      variant="bordered"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((category, index) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.nome}
                        </SelectItem>
                      ))}
                    </Select>
                    <Button onPress={() => setShowAddCategoryModal(true)}>Adicionar Categoria</Button>
                  </div>
                  <div> {/* Observation Input */}
                    {errors.observation && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.observation}</p>}
                    <Input
                      autoFocus
                      label="Observação do livro"
                      type="text"
                      placeholder="Digite a observação"
                      variant="bordered"
                      value={observation}
                      onChange={(e) => setObservation(e.target.value)}
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
      {showAddAuthorModal && <ModalAddAuthor isOpen={showAddAuthorModal} onClose={() => setShowAddAuthorModal(false)} onAuthorAdded={(authorName: any) => {
        setAuthors([...authors, authorName]);
        setAuthor(authorName);
        setShowAddAuthorModal(false);
      }} />}
      {showAddCategoryModal && <ModalAddCategory isOpen={showAddCategoryModal} onClose={() => setShowAddCategoryModal(false)} onCategoryAdded={(categoryName: any) => {
        setCategories([...categories, categoryName]);
        setCategory(categoryName);
        setShowAddCategoryModal(false);
      }} />}
    </>
  );
}
