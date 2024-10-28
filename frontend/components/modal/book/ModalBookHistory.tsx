'use client'

import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, user } from "@nextui-org/react";
import { useJwtToken } from "@/hooks/useJwtToken";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

import { useRouter } from 'next/navigation'
import { fetchReader, fetchReaderHistory } from '@/components/readers/dataReaders';
import { format, intervalToDuration } from 'date-fns';
import { fetchBook, fetchHistoryBook } from '@/components/table/databook';

export default function ModalBookHistory({ isOpen, onClose, bookID }: any) {

    const router = useRouter()
    // Get token
    const token = useJwtToken();

    const [isLoading, setIsLoading] = useState(false);

    const [book, setBook] = useState<Book | null>(null)

    const [history, setHistory] = useState<bookHistory>({media:0, emprestimos:[]})

    useEffect(()=>{

        const fetchDataBook = async () => {
            try {
                if (!token) return;
                setIsLoading(true)
                const bookData = await fetchBook(token, router, bookID)
                setBook(bookData)
                setIsLoading(false)
            } catch (error) {
                console.error("Error fetching book:", error);
            }
        };

        const fetchDataHistory = async () => {
            try {
                if (!token) return;
                setIsLoading(true)
                const historyData = await fetchHistoryBook(token, router, bookID)
                setHistory(historyData)
                setIsLoading(false)
                console.log(history)

            } catch (error) {
                console.error("Error fetching readers:", error);
            }
        };

        fetchDataBook()
        fetchDataHistory()

    }, [token, bookID, isLoading])



  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} size='5xl' placement="top-center" isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-lg">
                {`Histórico do livro: ${book?.nome}`}
              </ModalHeader>
              <ModalBody>
              <p><b>Total de empréstimos:</b> {history.emprestimos.length}</p>
              <p><b>Duração média dos empréstimos:</b> {(history.media ? history.media : "0") + " dias"}</p>
              <Table>
                    <TableHeader>
                        <TableColumn>Livro</TableColumn>
                        <TableColumn>Data de Empréstimo</TableColumn>
                        <TableColumn>Data Prevista</TableColumn>
                        <TableColumn>Data de Devolução</TableColumn>
                        <TableColumn>Duração</TableColumn>
                        <TableColumn>Estado</TableColumn>
                    </TableHeader>
                    <TableBody items={history?.emprestimos} emptyContent={"O livro não possui empréstimos"}>

                      {(item)=>(
                        <TableRow key={item.id}>
                          <TableCell>{item.exemplar.id + " - "+item.exemplar.livro.nome}</TableCell>
                          <TableCell>{format(item.dataCriacao, "dd/MM/yyyy")}</TableCell>
                          <TableCell>{format(item.dataDevolucao, "dd/MM/yyyy")}</TableCell>
                          <TableCell>{( item.estado=="FINALIZADO" ? format(item.dataModificacao, "dd/MM/yyyy") : "Não efetuada")}</TableCell>
                          
                          <TableCell>{(intervalToDuration({start: item.dataCriacao, end: item.dataModificacao}).days ? intervalToDuration({start: item.dataCriacao, end: item.dataModificacao}).days : "0" ) + " Dias"}</TableCell>
                          <TableCell>{item.estado}</TableCell>
                      </TableRow>

                      )}
                        

                    </TableBody>
                    </Table>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}