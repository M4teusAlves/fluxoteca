
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

    const response = await fetch("http://192.168.7.22:8081/livros/status/true", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error("Falha ao obter livros");
    }
    const data = await response.json();
    const books = data; // Assuming your API response is an array of user objects
    
    console.log(books)

    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    return []; 
  }
}

export async function fetchDeleteBook(token:any, router: any, id: string) {
  try {

    if (!token) {
      router.push("/signin")
      alert('Token de autenticação não encontrado');
    }

    const response = await fetch(`http://192.168.7.22:8081/livros/${id}`, {
        method: 'DELETE',
        headers: {
        Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {

      if(response.status == 403)
          router.push("/signin")

      throw new Error("Falha ao obter livros");
    }
  } catch (error) {
      console.error("Error:", error); 
  }
}
 
export {columns, fetchBooks, statusOptions};
  