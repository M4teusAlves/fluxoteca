const columns = [
    {name: "LIVRO", uid: "livro", sortable: true},
    {name: "LEITOR", uid: "leitor", sortable: true},
    {name: "DATA DEVOLUÇÃO", uid: "dataDevolucao", sortable: true},
    {name: "", uid: "actions"},
  ];
  
  const statusOptions = [
    {name: "Active", uid: "active"},
    {name: "Paused", uid: "paused"},
  ];
  
  async function fetchRegisters(token: any) {
    try {

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
        throw new Error("Falha ao obter emprestimos");
      }
      const data: register[] = await response.json();

      const filteredDatas = data.filter(data => data.estado !== 'FINALIZADO');

      const registers = filteredDatas; // Assuming your API response is an array of user objects
      
      return registers;
    } catch (error) {
      console.error("Error fetching registros:", error);
      return []; 
    }
  }

  // Update dataDevolucao (PUT) register
  async function putRegister(token: any, registerID: number, registerDate: string) {
    try {
      if (!token) {
        alert('Ação não permitida pelo usuário!')
        return;
      }

      const register = {
        id: registerID,
        dataDevolucao: registerDate
      }

      const dataJSON = JSON.stringify(register);

      //TERMINAR
      const res = await fetch('http://localhost:8081/emprestimos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: dataJSON,
      })

      return res.ok

    } catch (e) {
      console.error('Erro ao atualizar os dados do empréstimo:', e)
    }
  }

    // Update status (PUT) register 
    async function handleDeleteRegister(token: any, registerID: number) {
      try {
        if (!token) {
          alert('Ação não permitida pelo usuário!')
          return;
        }

        const res = await fetch(`http://localhost:8081/emprestimos/finalizar/${registerID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
  
        return res.ok
  
      } catch (e) {
        console.error('Erro ao finalizar o empréstimo:', e)
      }
    }
 
  export {columns, fetchRegisters, statusOptions, putRegister, handleDeleteRegister};
  