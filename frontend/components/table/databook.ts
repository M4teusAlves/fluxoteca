
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

    const response = await fetch("http://localhost:8081/livros/status/true", {
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

export async function fetchBook(token:any, router: any, id: string) {
  try {

    if (!token) {
      router.push("/signin")
      alert('Token de autenticação não encontrado');
    }

    const response = await fetch(`http://localhost:8081/livros/${id}`, {
        method: 'GET',
        headers: {
        Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {

      if(response.status == 403)
          router.push("/signin")

      throw new Error("Falha ao obter livro");
    }

    const data = await response.json();
    const book = data;

    return book;

  } catch (error) {
      console.error("Error:", error); 
  }
}

export async function fetchHistoryBook(token:any, router: any, id: string) {
  try {

    if (!token) {
      router.push("/signin")
      alert('Token de autenticação não encontrado');
    }

    const response = await fetch(`http://localhost:8081/emprestimos/livro/historico/${id}`, {
        method: 'GET',
        headers: {
        Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {

      if(response.status == 403)
          router.push("/signin")

      throw new Error("Falha ao obter histórico do livro");
    }

    const data = await response.json();
    const history = data;

    return history;

  } catch (error) {
      console.error("Error:", error); 
  }
}

export async function fetchDeleteBook(token:any, router: any, id: string) {
  try {

    if (!token) {
      router.push("/signin")
      alert('Token de autenticação não encontrado');
    }

    const response = await fetch(`http://localhost:8081/livros/${id}`, {
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

export async function fetchGenerateBackup(token:any, router:any) {
  try {

      if (!token) {
        router.push("/signin")
        alert('Token de autenticação não encontrado');
      }
  
      const res = await fetch(`http://localhost:8081/livros/backup`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {

        //if(res.status == 403)
            //router.push("/signin")

        throw new Error("Falha ao realizar o Backup");
      }
  } catch (error) {
      console.error("Error:", error); 
  }
}
 
export {columns, fetchBooks, statusOptions};
  