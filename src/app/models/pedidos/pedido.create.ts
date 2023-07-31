import { JogoId } from "../jogos/jogo.id";

export interface PedidoCreate {
    formaPagamento: {id: number},
    jogos: JogoId[],
}