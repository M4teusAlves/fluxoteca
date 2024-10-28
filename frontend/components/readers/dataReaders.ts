export async function fetchReader(token:any, router:any, id:string) {
    try {

        console.log(id)
  
        if (!token) {
          router.push("/signin")
          alert('Token de autenticação não encontrado');
          return [];
        }
  
        const response = await fetch(`http://localhost:8081/leitores/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        console.log(response.json)
  
        if (!response.ok) {
  
          if(response.status == 403)
              router.push("/signin")
  
          throw new Error("Falha ao obter Leitor");
        }
        const data = await response.json();
        const leitor = data; 
  
        // Assuming your API response is an array of user objects
        
        return leitor;
      } catch (error) {
        console.error("Error fetching exemplars:", error);
        return []; 
      }
  
  
}

export async function fetchReaderHistory(token:any, router:any, id:string) {
    try {
  
        if (!token) {
          router.push("/signin")
          alert('Token de autenticação não encontrado');
          return [];
        }
  
        const response = await fetch(`http://localhost:8081/emprestimos/leitor/historico/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
  
          if(response.status == 403)
              router.push("/signin")
  
          throw new Error("Falha ao obter Leitor");
        }
        const data = await response.json();
        const history = data;

        console.log(history)
  
        // Assuming your API response is an array of user objects
        
        return history;
      } catch (error) {
        console.error("Error fetching exemplars:", error);
        return []; 
      }
  
  
}