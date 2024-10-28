
type contentReportCard = {
    title:string,
    content:any,
}

type register = {
    id:number,
    exemplar: exemplar,
    leitor: leitor,
    dataDevolucao: Date,
    estado:string,
    status:boolean,
    dataCriacao: Date,
    dataModificacao: Date
}

type bookHistory = {
    media:number,
    emprestimos:register[]
}

type exemplar = {
    id:string,
    livro:littleBook,
    localizacao:string,
    estado:string,
    status:boolean
}

type littleBook = {
    id:number,
    nome:string,
}

type Book = {
    id:number,
    nome:string,
    observacao:string,
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

type user = {
    id:number,
    login:string,
    tipo:string,
    status:boolean
}
