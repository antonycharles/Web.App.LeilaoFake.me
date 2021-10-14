import { ILeilaoPaginacao } from "../interfaces/leilao.paginacao.js";
import axios from "axios";
import config from "../dados.json"
import { ILeilao } from "../interfaces/leilao.js";
import { IErroDefault } from "../interfaces/erro.default.js";

export const leiloesService = {
    getLeiloesPublicos,
    getMeusLeiloes,
    getLeilaoId
};

function getLeiloesPublicos(dados:ILeilaoPaginacao): Promise<ILeilaoPaginacao> {
    const request = {
        pagina: dados.pagina,
        porPagina: dados.porPagina,
        order: dados.order,
        search: dados.search
    }

    return axios.get(`${config.api_url}/Leilao`,{params:request})
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
    return fetch(`${config.api_url}/leilao/${leilaoId}`, {
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