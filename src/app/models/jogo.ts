import { Categoria } from "./categoria";
import { DesenvolvedoraResumo } from "./desenvolvedora";
import { Modo } from "./modo";
import { Plataforma } from "./plataforma";
import { Requisito } from "./requisito";

export class Jogo {
    id!: number;
    nome!: string;
    uriNome!: string;
    urlVideo!: string;
    urlImgHero!: string;
    urlImagem!: string;
    dataLancamento!: string;
    descricao!: string;
    preco!: number;
    nota!: number;
    desenvolvedora!: DesenvolvedoraResumo;
    categorias!: Categoria[];
    plataformas!: Plataforma[];   
    requisitos!: Requisito[];
    modos!: Modo[];

}