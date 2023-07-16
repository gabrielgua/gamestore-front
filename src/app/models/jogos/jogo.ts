import { Categoria } from "../categorias/categoria";
import { DesenvolvedoraResumo } from "../desenvolvedoras/desenvolvedora";
import { Modo } from "../modos/modo";
import { Plataforma } from "../plataformas/plataforma";
import { Requisito } from "../requisitos/requisito";

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