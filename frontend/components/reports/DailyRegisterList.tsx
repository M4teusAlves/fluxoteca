'use client'
import { useJwtToken } from "@/hooks/useJwtToken";
import { Accordion, AccordionItem, Button, ScrollShadow } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchFinishRegister, fetchRegisters, fetchReport, updateStateRegister } from "./dataReports";

interface prop {
  setReport:React.Dispatch<React.SetStateAction<report|undefined>>
}

export default function DailyRegisterList({setReport}:prop){

    const router = useRouter();

    const token = useJwtToken();
    const [registers, setRegisters] = useState<register[]>([]);

    async function finishRegister(id:string) {
      try {
        await fetchFinishRegister(token, router, id);
        const registersData = await fetchRegisters(token, router);
        const reportData = await fetchReport(token, router);
        setReport(reportData);
        setRegisters(registersData);
      } catch (error) {
        console.error("Error fetching registers:", error);
      }
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            if (!token) return;
            await updateStateRegister(token, router);
            const reportData = await fetchRegisters(token, router);
            setRegisters(reportData);
          } catch (error) {
            console.error("Error fetching registers:", error);
          }
        };
    
        fetchData();
      }, [token]);

    return(
        <div className="flex flex-col gap-2 items-center justify-start w-96 border-1 rounded-md shadow-xl">
            <p className="w-full text-center border-b-2 border-gray-300 p-2">Empréstimos que vencem hoje</p>
            <ScrollShadow className="w-full h-[35rem] flex flex-col">
                {registers.length === 0 &&
                    <p className="mt-11 w-full text-center">Não há espréstimos para hoje</p>
                }
                <Accordion variant="splitted">
                  {registers.map((register)=>(
                    <AccordionItem title={register.leitor.nome}>
                      <b>Afiliação</b>
                      <p>{register.leitor.afiliacao}</p>
                      <b>Contato</b>
                      <p>{register.leitor.email}</p>
                      <p>{register.leitor.telefone}</p>
                      <b>Exemplar</b>
                      <p>{register.exemplar.id +" - "+register.exemplar.livro.nome}</p>
                      <b>Localização</b>
                      <p>{register.exemplar.localizacao}</p>
                      <Button color="primary" onClick={()=>{finishRegister(register.id.toString())}}>
                        Finalizar
                      </Button>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                
            </ScrollShadow>
        </div>
    )
}