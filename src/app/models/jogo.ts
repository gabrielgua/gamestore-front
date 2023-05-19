import { Categoria } from "./categoria";
import { Plataforma } from "./plataforma";
import { Requisito } from "./requisito";

export class Jogo {
    id!: number;
    nome!: string;
    uriNome!: string;
    descricao!: string;
    preco!: number;
    nota!: number;
    categorias!: Categoria[];
    plataformas!: Plataforma[];   
    requisitos!: Requisito[];
}