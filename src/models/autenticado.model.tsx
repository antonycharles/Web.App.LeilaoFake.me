import moment from "moment";
import IUsuarioLogado from "../interfaces/usuario.logado";

export const autenticadoModel = {
    userAutenticado
};

function userAutenticado(): IUsuarioLogado {

    /*
    const userInfo = localStorage.getItem('user-info')
    if (userInfo && userInfo !== '') {
        const usuarioLogado: IUsuarioLogado = JSON.parse(userInfo);

        const dataExpiration = moment.utc(usuarioLogado.expiration);
        const dataAtual = moment();

        if(dataExpiration >= dataAtual){
            return usuarioLogado;
        }
        
    }*/

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