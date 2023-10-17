import { TipoUsuario } from "./tipo.usuario";

export class Usuario {
    id: number = 0;
    nome?: string;
    email: string = '';
    avatarUrl: string = '';
    username: string = '';
    tipo: TipoUsuario = TipoUsuario.USER;
    dataCadastro: Date = new Date()

}