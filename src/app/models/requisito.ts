import { TipoRequisito } from "./tipoRequisito";

export class Requisito {
    id!: number;
    tipo!: TipoRequisito;
    observacoes!: string;
    sistema!: string;
    memoria!: string;
    processador!: string;
    placaDeVideo!: string;
    armazenamento!: string;
}