"use client"
import DailyRegisterList from "@/components/reports/DailyRegisterList";
import ReportCard from "@/components/reports/ReportCard";
import { useJwtToken } from "@/hooks/useJwtToken";
import {ScrollShadow } from "@nextui-org/react"
import {Accordion, AccordionItem} from "@nextui-org/react";
import { title } from "process";
import { useEffect, useState } from "react";

export default function Reports(){

    const token = useJwtToken();
    const [report, setReport] = useState<report>();
    
    async function fetchReport(token: any) {
        try {
    
          if (!token) {
            alert('Token de autenticação não encontrado');
            return [];
          }
      
          const response = await fetch("http://localhost:8081/relatorios", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (!response.ok) {
            throw new Error("Falha ao obter livros");
          }
          const data = await response.json();
          const report = data; // Assuming your API response is an array of user objects
          
          return report;
        } catch (error) {
          console.error("Error fetching reports:", error);
          return []; 
        }
    
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            if (!token) return;
            const reportData = await fetchReport(token);
            setReport(reportData);
          } catch (error) {
            console.error("Error fetching books:", error);
          }
        };
    
        fetchData();
      }, [token]);


    return(
        <div className="flex w-full flex-col p-5 gap-7">
            <header>
                <h1 className="text-2xl">Relatório Semestral</h1>
            </header>
            <main className="flex justify-center gap-8">
                <DailyRegisterList/>
                <section className="flex gap-2 flex-wrap w-[60rem] items-center">
                    <ReportCard 
                    title="Novos livros"
                    content={report?.novosLivros}
                    />
                    <ReportCard 
                    title="Novos Leitores"
                    content={report?.novosLeitores}
                    />
                    <ReportCard 
                    title="Novos Exemplares"
                    content={report?.novosExemplares}
                    />
                    <ReportCard 
                    title="Empréstimos Concluídos"
                    content={report?.emprestimosConcluidos}
                    />

                    <div className="flex flex-col p-4 justify-center rounded-md w-[33rem] h-64 shadow-large gap-3">
                        <b className="text-xl">Livro Mais Emprestado</b>
                        <p className="text-lg">{report?.livroMaisEmprestado.nome}</p>
                        <b className="text-xl">Categoria Mais Emprestado</b>
                        <p className="text-lg">{report?.categoriaMaisEmprestada.nome}</p>
                        <b className="text-xl">Leitor Mais Assíduo</b>
                        <p className="text-lg">{report?.leitorMaisAssiduo.nome}</p>
                    </div>

                </section>
            </main>
            

        </div>

    )
}