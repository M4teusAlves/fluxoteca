export async function fetchExemplarsByBook(token:any, router:any, id:string) {

    try {

        if (!token) {
          router.push("/signin")
          alert('Token de autenticação não encontrado');
          return [];
        }
    
        const response = await fetch(`http://localhost:8081/exemplares/livro/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
  
          if(response.status == 403)
              router.push("/signin")
  
          throw new Error("Falha ao obter Exemplares");
        }
        const data = await response.json();
        const exemplars = data; // Assuming your API response is an array of user objects
        
        return exemplars;
      } catch (error) {
        console.error("Error fetching exemplars:", error);
        return []; 
      }
    
}

export async function fetchExemplar(token:any, router:any, id:string) {

  try {

      if (!token) {
        router.push("/signin")
        alert('Token de autenticação não encontrado');
        return [];
      }
  
      const response = await fetch(`http://localhost:8081/exemplares/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {

        if(response.status == 403)
            router.push("/signin")

        throw new Error("Falha ao obter Exemplares");
      }
      const data = await response.json();
      const exemplar = data; // Assuming your API response is an array of user objects
      
      return exemplar;
    } catch (error) {
      console.error("Error fetching exemplars:", error);
      return []; 
    }
  
}

export async function fetchUpdateExemplar(token:any, router:any, id:string) {

  try {

      if (!token) {
        router.push("/signin")
        alert('Token de autenticação não encontrado');
        return [];
      }
  
      const response = await fetch(`http://localhost:8081/exemplares/livro/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {

        if(response.status == 403)
            router.push("/signin")

        throw new Error("Falha ao obter Exemplares");
      }
      const data = await response.json();
      const exemplars = data; // Assuming your API response is an array of user objects
      
      return exemplars;
    } catch (error) {
      console.error("Error fetching exemplars:", error);
      return []; 
    }
  
}


export async function fetchDeleteExemplar(token:any, router:any, id:string) {

  try {

      if (!token) {
        router.push("/signin")
        alert('Token de autenticação não encontrado');
        return [];
      }
  
      const response = await fetch(`http://localhost:8081/exemplares/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {

        if(response.status == 403)
            router.push("/signin")

        throw new Error("Falha ao obter Exemplares");
      }
      const data = await response.json();
      const exemplars = data; // Assuming your API response is an array of user objects
      
      return exemplars;
    } catch (error) {
      console.error("Error fetching exemplars:", error);
      return []; 
    }
  
}