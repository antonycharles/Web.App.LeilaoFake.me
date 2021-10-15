import axios from "axios";
import moment from "moment";
import { IUsuarioLogado } from "../interfaces/usuario.logado";

export const autenticadoModel = {
    userAutenticado,
    sair
};

function userAutenticado(): IUsuarioLogado {

    const userInfo = localStorage.getItem('user-info')
    if (userInfo && userInfo != '') {
        const usuarioLogado: IUsuarioLogado = JSON.parse(userInfo);

        const dataExpiration = moment.utc(usuarioLogado.expiration);
        const dataAtual = moment();

        if(dataExpiration >= dataAtual){
            axios.defaults.headers.common = { 'Authorization': `bearer ${usuarioLogado.accessToken}` };
            return usuarioLogado;
        }
        sair();
    }

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


function sair(): void {
    axios.defaults.headers.common = { 'Authorization': `` };
    localStorage.setItem('user-info', '');
}

