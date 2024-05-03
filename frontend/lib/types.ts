export interface User {
    nome: string,
    endereco: string,
    email: string,
    // afiliacao: string,
    dataNascimento: Date,
    tipo?: "LEITOR",
    telefone: string,
}