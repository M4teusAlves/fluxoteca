import React, { useRef, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useJwtToken } from "@/hooks/useJwtToken";

export default function ModalAddAuthor({ isOpen, onClose, onAuthorAdded }: any) {
  const formRef = useRef<HTMLFormElement>(null);
  const [authorName, setAuthorName] = useState('');
  const [errors, setErrors] = useState<{ name?: string }>({});

  // Get token
  const token = useJwtToken();

  // Validate form fields
  const validateForm = () => {
    const newErrors = {} as { name?: string };

    if (!authorName) {
      newErrors.name = 'Campo obrigatório.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Close modal
  const handleClose = () => {
    onClose();
  };

  // POST author
  async function handleAddAuthor() {
    try {
      if (!token) {
        alert('Ação não permitida pelo usuário!');
        return;
      }

      if (!validateForm()) {
        return;
      }

      const author = {
        nome: authorName,
      };

      const res = await fetch('http://localhost:8081/autores', {
        method: 'POST',
        body: JSON.stringify(author),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        onAuthorAdded(authorName);
        formRef.current?.reset();
        setAuthorName('');
        onClose();
      }

    } catch (e) {
      console.error('Erro ao adicionar autor:', e);
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" isDismissable={false} isKeyboardDismissDisabled={true}>
        <form onSubmit={(e) => { e.preventDefault(); handleAddAuthor(); }} ref={formRef}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-lg">
                  Adicionar Autor
                </ModalHeader>
                <ModalBody>

                  <div> {/* Author Name Input */}
                    {errors.name && <p className="text-red-500 text-xs absolute right-8 mt-7">{errors.name}</p>}
                    <Input
                      autoFocus
                      label="Nome do autor"
                      type="text"
                      placeholder="Digite o nome"
                      variant="bordered"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
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
