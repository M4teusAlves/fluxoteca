'use client'

import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, user } from "@nextui-org/react";
import { useJwtToken } from "@/hooks/useJwtToken";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

import { useRouter } from 'next/navigation'
import { fetchReader, fetchReaderHistory } from '@/components/readers/dataReaders';
import { format, intervalToDuration } from 'date-fns';

export default function ModalHistoryReader({ isOpen, onClose, userID }: any) {

    const router = useRouter()
    // Get token
    const token = useJwtToken();

    const [isLoading, setIsLoading] = useState(false);

    const [reader, setReader] = useState<leitor | null>(null)

    const [history, setHistory] = useState<register[]>([])

    useEffect(()=>{

        const fetchDataReader = async () => {
            try {
                if (!token) return;
                setIsLoading(true)
                const readerData = await fetchReader(token, router, userID)
                setReader(readerData)
                setIsLoading(false)
            } catch (error) {
                console.error("Error fetching readers:", error);
            }
        };

        const fetchDataHistory = async () => {
            try {
                if (!token) return;
                setIsLoading(true)
                const historyData = await fetchReaderHistory(token, router, userID)
                setHistory(historyData)
                setIsLoading(false)
                console.log(history)

            } catch (error) {
                console.error("Error fetching readers:", error);
            }
        };

        fetchDataReader()
        fetchDataHistory()

    }, [token, userID, isLoading])



  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} size='5xl' placement="top-center" isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-lg">
                {`Histórico do leitor: ${reader?.nome}`}
              </ModalHeader>
              <ModalBody>
              <p><b>Total de empréstimos:</b> {history.length}</p>
              <Table>
                    <TableHeader>
                        <TableColumn>Livro</TableColumn>
                        <TableColumn>Data de Empréstimo</TableColumn>
                        <TableColumn>Data Prevista</TableColumn>
                        <TableColumn>Data de Devolução</TableColumn>
                        <TableColumn>Duração</TableColumn>
                        <TableColumn>Estado</TableColumn>
                    </TableHeader>
                    <TableBody items={history} emptyContent={"O leitor não possui empréstimos"}>

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