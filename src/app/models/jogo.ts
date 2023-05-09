import { Categoria } from "./categoria";
import { Plataforma } from "./plataforma";

export class Jogo {
    id!: number;
    nome!: string;
    uriNome!: string;
    descricao!: string;
    preco!: number;
    nota!: number;
    categorias!: Categoria[];
    plataformas!: Plataforma[];   
}