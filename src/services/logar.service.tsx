import axios from "axios";
import dados from "../dados.json"
import { IErroDefault } from "../interfaces/erro.default";
import { IUsuarioLogado } from "../interfaces/usuario.logado";

export const logarService = {
    logar,
    sair
}

function logar(email: string): Promise<IUsuarioLogado> {
    localStorage.setItem('user-info', '');

    return autenticacaoServidor(email)
        .then((dados: IUsuarioLogado) => {
            localStorage.setItem('user-info', JSON.stringify(dados));
            return dados;
        })
}

function sair(): void {
    localStorage.setItem('user-info', '');
}



function autenticacaoServidor(email: string): Promise<IUsuarioLogado> {
    return axios.post(`${dados.api_url}/Login`, {
        "email": email
    })
        .then(response => {
            return response.data as unknown as IUsuarioLogado;
        })
        .then((dados: IUsuarioLogado) => {
            return dados;
        })
        .catch(error => {
            return Promise.reject(getDadosErro(error.response));
        });
}

function getDadosErro(error: any): IErroDefault {
    const code = 0;
    return {
        code: error.data.code,
        message: error.data.message,
        details: error.data.details,
        innerError: error.data.innerError
    }
}