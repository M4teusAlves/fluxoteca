
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

    const response = await fetch("http://localhost:8081/livros", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error("Falha ao obter registros");
    }
    const data = await response.json();
    const users = data; // Assuming your API response is an array of user objects
    
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; 
  }
}

export {columns, fetchUsers, statusOptions};
