
/// Empréstimos
export async function updateStateRegister(token: any, router:any){
    try {

        if (!token) {
          router.push("/signin")
          alert('Token de autenticação não encontrado');
        }
    
        const response = await fetch("http://localhost:8081/emprestimos/validar", {
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

export async function fetchFinishRegister(token: any, router:any, id:string){
  try {

      if (!token) {
        router.push("/signin")
        alert('Token de autenticação não encontrado');
      }
  
      const response = await fetch(`http://localhost:8081/emprestimos/finalizar/${id}`, {
          method: 'PUT',
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

export async function fetchRegisters(token: any, router:any) {
    try {

      if (!token) {
        router.push("/signin")
        alert('Token de autenticação não encontrado');
        return [];
      }
  
      const response = await fetch("http://localhost:8081/emprestimos/estado/ULTIMO_DIA", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {

        if(response.status == 403)
            router.push("/signin")

        throw new Error("Falha ao obter livros");
      }
      const data = await response.json();
      const report = data; // Assuming your API response is an array of user objects
      
      return report;
    } catch (error) {
      console.error("Error fetching reports:", error);
      return []; 
    }

}

///Relatórios
export async function fetchReport(token: any, router:any) {
  try {

    if (!token) {
      router.push("/signin")
      alert('Token de autenticação não encontrado');
      return [];
    }

    const response = await fetch("http://localhost:8081/relatorios", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      if(response.status == 403)
        router.push("/signin")
      throw new Error("Falha ao obter livros");
    }
    const data = await response.json();
    const report = data; // Assuming your API response is an array of user objects
    
    return report;
  } catch (error) {
    console.error("Error fetching reports:", error);
    return []; 
  }

}