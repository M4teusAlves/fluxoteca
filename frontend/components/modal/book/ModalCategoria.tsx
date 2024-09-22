import React, { useRef, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useJwtToken } from "@/hooks/useJwtToken";

export default function ModalAddCategory({ isOpen, onClose}: any) {
  const formRef = useRef<HTMLFormElement>(null);
  const [categoryName, setCategoryName] = useState('');
  const [errors, setErrors] = useState<{ name?: string }>({});

  const [showMessageConfimation, setShowMessageConfirmation] = useState(false);
  const messageConfirmation = 'Cadastrada com sucesso.';
  const [showMessageError, setShowMessageError] = useState(false);
  const messageError = 'Categoria já existente.';

  // Get token
  const token = useJwtToken();

  // Validate form fields
  const validateForm = () => {
    const newErrors = {} as { name?: string };

    if (!categoryName) {
      newErrors.name = 'Campo obrigatório.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Close modal
  const handleClose = () => {
    onClose();
  };

  // POST category
  async function handleAddCategory() {
    try {
      if (!token) {
        alert('Ação não permitida pelo usuário!');
        return;
      }

      if (!validateForm()) {
        return;
      }

      const category = {
        nome: categoryName,
      };

      const res = await fetch('http://localhost:8081/categorias', {
        method: 'POST',
        body: JSON.stringify(category),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setShowMessageConfirmation(true)
        setTimeout(() => setShowMessageConfirmation(false), 3000);
      }else{
        setShowMessageError(true)
        setTimeout(() => setShowMessageError(false), 3000);
      }

    } catch (e) {
      console.error('Erro ao adicionar categoria:', e);
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" isDismissable={false} isKeyboardDismissDisabled={true}>
        <form onSubmit={(e) => { e.preventDefault(); handleAddCategory(); }} ref={formRef}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-lg">
                  Adicionar Categoria
                  {showMessageConfimation && <p className="text-green-600 text-sm fixed mt-7">{messageConfirmation}</p>}
                  {showMessageError && <p className="text-red-600 text-sm fixed mt-7">{messageError}</p>}
                </ModalHeader>
                <ModalBody>

                  <div> {/* Category Name Input */}
                    {errors.name && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.name}</p>}
                    <Input
                      autoFocus
                      label="Nome da categoria"
                      type="text"
                      placeholder="Digite o nome"
                      variant="bordered"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </div>

                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={handleClose}>
                    Cancelar
                  </Button>
                  <Button color="primary" type="submit">
                    Adicionar
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
