import IUsuario from "./usuario";

export default interface IUsuarioLogado {
    authenticated: boolean,
    created: Date,
    expiration: Date,
    accessToken: string,
    message: string,
    usuario: IUsuario
}