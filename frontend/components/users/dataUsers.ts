export async function fetchActiveUser(token:any, router:any, id:string) {
    try {

        if (!token) {
          router.push("/signin")
          alert('Token de autenticação não encontrado');
        }
    
        const response = await fetch(`http://localhost:8081/usuarios/${id}`, {
            method: 'PUT',
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
  
          if(response.status == 403)
              router.push("/signin")
  
          throw new Error("Falha ao atualizar empréstimos");
        }
    } catch (error) {
        console.error("Error:", error); 
    }
}

export async function fetchDeleteUser(token:any, router:any, id:string) {
  try {

      if (!token) {
        router.push("/signin")
        alert('Token de autenticação não encontrado');
      }
  
      const response = await fetch(`http://localhost:8081/usuarios/${id}`, {
          method: 'DELETE',
          headers: {
          Authorization: `Bearer ${token}`
          }
      });
      if (!response.ok) {

        if(response.status == 403)
            router.push("/signin")

        throw new Error("Falha ao deletar usuário");
      }
  } catch (error) {
      console.error("Error:", error); 
  }
}

export async function fetchUsersByStatus(token:any, router:any, status:boolean) {

    try {

        if (!token) {
          router.push("/signin")
          alert('Token de autenticação não encontrado');
          return [];
        }
    
        const response = await fetch(`http://localhost:8081/usuarios/status/${status}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
  
          if(response.status == 403)
              router.push("/signin")
  
          throw new Error("Falha ao obter Usuários");
        }
        const data = await response.json();
        const report = data; // Assuming your API response is an array of user objects
        
        return report;
      } catch (error) {
        console.error("Error fetching reports:", error);
        return []; 
      }
    
}