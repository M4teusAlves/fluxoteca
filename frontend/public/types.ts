
type contentReportCard = {
    title:string,
    content:any,
}

type exemplar = {
    id:string,
    livro:littleBook,
    localizacao:string,
    estado:string,
    status:boolean
}

type littleBook = {
    id:string,
    nome:string,
}

type Book = {
    id:string,
    nome:string,
    categoria:string,
    autor: string,
    status:boolean,
    exemplares:exemplar[]
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

