import { IUsuarioLogado } from "../interfaces/usuario.logado";

export const autenticadoModel = {
    naoAutenticado
};

function naoAutenticado(): IUsuarioLogado
{
    return {
        authenticated: false,
        created: new Date(),
        expiration: new Date(),
        accessToken: "",
        message: "",
        usuario: {
            id: "",
            nome: "",
            email: ""
        }
    }
}