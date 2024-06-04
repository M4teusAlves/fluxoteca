
const columns = [
    // {name: "ID", uid: "id", sortable: true},
    {name: "NOME", uid: "nome", sortable: true},
    {name: "CATEGORIA", uid: "categoria", sortable: true},
    {name: "AUTOR", uid: "autor", sortable: true},
    // {name: "STATUS", uid: "status", sortable: true},
    {name: "", uid: "actions"},
  ];
  
  const statusOptions = [
    {name: "Active", uid: "active"},
    {name: "Paused", uid: "paused"},
  ];
  
  async function fetchBooks(token: any) {
    try {

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
        throw new Error("Falha ao obter livros");
      }
      const data = await response.json();
      const books = data; // Assuming your API response is an array of user objects
      
      return books;
    } catch (error) {
      console.error("Error fetching books:", error);
      return []; 
    }
  }
 
  export {columns, fetchBooks, statusOptions};
  