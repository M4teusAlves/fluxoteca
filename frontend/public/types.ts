
type contentReportCard = {
    title:string,
    content:any,
}

type Book = {
    id:string,
    nome:string,
    categoria:string,
    autor: string,
    status:boolean
}


type leitor = {
    id:number,
    nome:string,
    endereco:string,
    email:string,
    afiliacao:string,
    dataNascimento:Date,
    telefone:string,
    status:boolean,
    dataCriacao:Date,
    dataModificacao:Date
}

type category = {
    id:number,
    nome:string,
    dataCriacao:Date,
    dataModificacao:Date,
    status:boolean
}

type report = {
    novosLeitores:number,
    novosLivros:number,
    novosExemplares:number,
    emprestimosConcluidos:number,
    livroMaisEmprestado:Book,
    categoriaMaisEmprestada:category,
    leitorMaisAssiduo:leitor
}

