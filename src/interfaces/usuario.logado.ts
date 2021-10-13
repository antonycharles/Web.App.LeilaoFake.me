import { IUsuario } from "./usuario.js";

export interface IUsuarioLogado {
    authenticated: boolean,
    created: Date,
    expiration: Date,
    accessToken: string,
    message: string,
    usuario: IUsuario
}