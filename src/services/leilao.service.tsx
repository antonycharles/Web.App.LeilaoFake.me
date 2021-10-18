import { ILeilaoPaginacao } from "../interfaces/leilao.paginacao";
import axios from "axios";
import config from "../dados.json"
import { ILeilao } from "../interfaces/leilao";
import { IErroDefault } from "../interfaces/erro.default";
import { autenticadoModel } from "../models/autenticado.model";

export const leiloesService = {
    getLeiloesPublicos,
    getLeilaoId
};

function getLeiloesPublicos(dados: ILeilaoPaginacao): Promise<ILeilaoPaginacao> {

    const request = {
        pagina: dados.pagina,
        porPagina: dados.porPagina,
        order: dados.order,
        meusLeiloes: dados.meusLeiloes,
        search: dados.search
    }

    return axios.get(`${config.api_url}/Leilao`, { params: request, })
        .then(response => {
            return response.data as unknown as ILeilaoPaginacao;
        })
        .then((dados: ILeilaoPaginacao) => {
            console.log(dados);
            return dados;
        })
        .catch(error => {
            return Promise.reject(getDadosErro(error));
        });
}

function getLeilaoId(leilao_id: string): Promise<ILeilao> {
    return axios.get(`${config.api_url}/leilao/${leilao_id}`)
        .then(response => {
            return response.data as unknown as ILeilao;
        })
        .then((dados : ILeilao) => {
            return dados;
        })
        .catch(error => {
            return Promise.reject(getDadosErro(error));
        });

}

function getDadosErro(error: any): IErroDefault {
    return {
        code: error.response.data.code,
        message: error.response.data.message,
        details: error.response.data.details,
        innerError: error.response.data.innerError
    }
}