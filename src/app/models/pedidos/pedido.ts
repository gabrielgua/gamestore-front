import { FormaPagamento } from "../formas-pagamento/forma.pagamento";
import { JogoPedido } from "../jogos/jogo.pedido";
import { UsuarioPedido } from "../usuarios/usuario.pedido";
import { StatusPedido } from "./status.pedido";

export interface Pedido {
    id: number;
    codigo: string;
    valorTotal: number;
    formaPagamento: FormaPagamento;
    dataCriacao: Date;
    dataConfirmacao?: Date;
    dataCancelamento?: Date;
    dataReembolso?: Date;
    status: StatusPedido;
    usuario: UsuarioPedido;
    jogos: JogoPedido[];
}