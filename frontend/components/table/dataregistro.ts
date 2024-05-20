import React, { useState, useEffect } from "react";
// import { useJwtToken } from "@/hooks/useJwtToken";

const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NOME LIVRO", uid: "nomelivro", sortable: true},
  {name: "NOME USUARIO", uid: "nomeusuario", sortable: true},
  {name: "DATA DE ENTREGA", uid: "dataent", sortable: true},
  {name: "", uid: "actions"},
];

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
];

async function fetchUsers(token: any) {
  try {
    // const token = useJwtToken();
    if (!token) {
      alert('Token de autenticação não encontrado');
      return [];
    }

    // Replace this with your actual data
    const users = [
      {
       id: 1,
       nomelivro: "Livro Teste",
       nomeusuario: "Paulo Eduardo",
       dataent: "14/02/2024",
   
      },
      {
        id: 2,
        nomelivro: "Livro Real",
        nomeusuario: "Simas T. Silva",
        dataent: "15/02/2024",
    
       },
       {
        id: 3,
        nomelivro: "Turbulencias",
        nomeusuario: "João Real",
        dataent: "14/05/2024",
    
       },
       {
        id: 4,
        nomelivro: "Perdão",
        nomeusuario: "Maria Traíra",
        dataent: "14/02/2022",
    
       },
    ];
    
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; 
  }
}

export {columns, fetchUsers, statusOptions};
