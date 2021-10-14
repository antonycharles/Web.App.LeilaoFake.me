import { ILeilaoPaginacao } from "../interfaces/leilao.paginacao.js";
import axios from "axios";
import dados from "../dados.json"
import { ILeilao } from "../interfaces/leilao.js";
import { IErroDefault } from "../interfaces/erro.default.js";

export const cadastroService = {
    getLeiloesPublicos,
    getMeusLeiloes,
    getLeilaoId
};

function getLeiloesPublicos(): Promise<ILeilaoPaginacao> {
    return axios.get(`${dados.api_url}/Leilao`)
        .then(response => {
            return response.data as unknown as ILeilaoPaginacao;
        })
        .then((dados: ILeilaoPaginacao) => {
            return dados;
        })
        .catch(error => {
            return Promise.reject(getDadosErro(error));
        });
}

function getMeusLeiloes(): Promise<ILeilaoPaginacao> {
    /*
    const usuarioLogado = await this.loginService.userLogado();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + usuarioLogado.accessToken)

    return fetch(`${dados.api_url}/leilao/meus-leiloes`, {
        method: 'GET',
        headers: myHeaders
    })
    .then(res => {
        return res.json();
    })
    .then((dados: ILeilaoPaginacao) => {
        return dados;
    });
    */
    return Promise.reject()
}

function getLeilaoId(leilaoId: string): Promise<ILeilao> {
    return fetch(`${dados.api_url}/leilao/${leilaoId}`, {
        method: 'GET'
    })
        .then(res => {
            return res.json();
        })
        .then((dados: ILeilao) => {
            return dados;
        })
}

function getDadosErro(error: any): IErroDefault {
    return {
        code: error.response.data.code,
        message: error.response.data.message,
        details: error.response.data.details,
        innerError: error.response.data.innerError
    }
}