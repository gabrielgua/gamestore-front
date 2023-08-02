import { DesenvolvedoraResumo } from "../desenvolvedoras/desenvolvedora";
import { Jogo } from "./jogo";

export class JogoResumo {
    id!: number;
    nome!: string;
    uriNome!: string;
    urlVideo?: string;
    urlImagem!: string;
    capsuleImg!: string;
    descricao!: string;
    preco!: number;
    nota!: number;
    desenvolvedora?: DesenvolvedoraResumo
}

export function toJogoResumo(jogo: Jogo): JogoResumo {
    return {
        id: jogo.id,
        descricao: jogo.descricao,
        nome: jogo.nome,
        nota: jogo.nota,
        preco: jogo.preco,
        uriNome: jogo.uriNome,
        urlImagem: jogo.urlImagem,
        capsuleImg: jogo.capsuleImg,
        desenvolvedora: jogo.desenvolvedora,
        urlVideo: jogo.urlVideo
    }
} 