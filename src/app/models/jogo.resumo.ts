import { DesenvolvedoraResumo } from "./desenvolvedora";

export class JogoResumo {
    id!: number;
    nome!: string;
    uriNome!: string;
    urlVideo?: string;
    urlImagem!: string;
    descricao!: string;
    preco!: number;
    nota!: number;
    desenvolvedora?: DesenvolvedoraResumo
}