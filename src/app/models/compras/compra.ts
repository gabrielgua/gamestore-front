import { JogoResumo } from "../jogos/jogo.resumo";

export interface Compra {
    id: number,
    usuarioId: number,
    jogo: JogoResumo,
    codigoPedido: string,
    chaveAtivacao: string,
    dataCompra: Date
}