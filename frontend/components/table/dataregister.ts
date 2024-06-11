
const columns = [
    // {name: "ID", uid: "id", sortable: true},
    {name: "NOME", uid: "name", sortable: true},
    {name: "LIVRO", uid: "livro", sortable: true},
    {name: "DATA ENTREGA", uid: "dataentrega", sortable: true},
    // {name: "STATUS", uid: "status", sortable: true},
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
  
      const response = await fetch("http://localhost:8081/emprestimos", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Falha ao obter emprestimo");
      }
      const data = await response.json();
      const users = data; // Assuming your API response is an array of user objects
      
      return users;
    } catch (error) {
      console.error("Error fetching registros:", error);
      return []; 
    }
  }
 
  export {columns, fetchUsers, statusOptions};
  