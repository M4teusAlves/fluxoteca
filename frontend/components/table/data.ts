
import React, { useState, useEffect } from "react";
// import { useJwtToken } from "@/hooks/useJwtToken";

const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NOME", uid: "name", sortable: true},
  {name: "TELEFONE", uid: "fone", sortable: true},
  {name: "EMAIL", uid: "email"},
  {name: "STATUS", uid: "status", sortable: true},
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

    const response = await fetch("http://localhost:8081/usuarios", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error("Falha ao obter usuários");
    }
    const data = await response.json();
    const users = data; // Assuming your API response is an array of user objects
    
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; 
  }
}

// const users = [
//   {
//     id: 1,
//     name: "Tony Reichert",
//     status: "active",
//     fone: "(34)9xxxx-xxxx",
//     email: "tony.reichert@example.com",
//     //avatar: "https://png.pngtree.com/png-clipart/20191120/original/pngtree-outline-user-icon-png-image_5045523.jpg",
//   },
//   {
//     id: 2,
//     name: "Zoey Lang",
//     status: "paused",
//     fone: "(34)9xxxx-xxxx",
//     email: "zoey.lang@example.com",
//   },
//   {
//     id: 3,
//     name: "Jane Fisher",
//     status: "active",
//     fone: "(34)9xxxx-xxxx",
//     email: "jane.fisher@example.com",
//   },
//   {
//     id: 4,
//     name: "William Howard",
//     status: "paused",
//     fone: "(34)9xxxx-xxxx",
//     email: "william.howard@example.com",
//   },
//   {
//     id: 5,
//     name: "Kristen Copper",
//     status: "active",
//     fone: "(34)9xxxx-xxxx",
//     email: "kristen.cooper@example.com",
//   },
//   {
//     id: 6,
//     name: "Brian Kim",
//     fone: "(34)9xxxx-xxxx",
//     email: "brian.kim@example.com",
//     status: "Active",
//   },
//   {
//     id: 7,
//     name: "Michael Hunt",
//     status: "paused",
//     fone: "(34)9xxxx-xxxx",
//     email: "michael.hunt@example.com",
//   },
//   {
//     id: 8,
//     name: "Samantha Brooks",
//     status: "active",
//     fone: "(34)9xxxx-xxxx",
//     email: "samantha.brooks@example.com",
//   },
//   {
//     id: 9,
//     name: "Frank Harrison",
//     status: "vacation",
//     fone: "(34)9xxxx-xxxx",
//     email: "frank.harrison@example.com",
//   },
//   {
//     id: 10,
//     name: "Emma Adams",
//     status: "active",
//     fone: "(34)9xxxx-xxxx",
//     email: "emma.adams@example.com",
//   },
//   {
//     id: 11,
//     name: "Brandon Stevens",
//     status: "active",
//     fone: "(34)9xxxx-xxxx",
//     email: "brandon.stevens@example.com",
//   },
//   {
//     id: 12,
//     name: "Megan Richards",
//     status: "paused",
//     fone: "(34)9xxxx-xxxx",
//     email: "megan.richards@example.com",
//   },
//   {
//     id: 13,
//     name: "Oliver Scott",
//     status: "active",
//     fone: "(34)9xxxx-xxxx",
//     email: "oliver.scott@example.com",
//   },
//   {
//     id: 14,
//     name: "Grace Allen",
//     status: "active",
//     fone: "(34)9xxxx-xxxx",
//     email: "grace.allen@example.com",
//   },
//   {
//     id: 15,
//     name: "Noah Carter",
//     status: "paused",
//     fone: "(34)9xxxx-xxxx",
//     email: "noah.carter@example.com",
//   },
// ];

export {columns, fetchUsers, statusOptions};
