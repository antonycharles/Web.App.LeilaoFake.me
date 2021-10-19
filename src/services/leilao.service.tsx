import { ILeilaoPaginacao } from "../interfaces/leilao.paginacao";
import { ILeilao } from "../interfaces/leilao";
import { baseService } from "./base.service";

export const leiloesService = {
    getLeiloes,
    getLeilaoId
};

function getLeiloes(dados: ILeilaoPaginacao): Promise<ILeilaoPaginacao> {

    const request = {
        pagina: dados.pagina,
        porPagina: dados.porPagina,
        order: dados.order,
        meusLeiloes: dados.meusLeiloes,
        search: dados.search
    }

    return baseService.getApi().get(`/Leilao`, { params: request, })
        .then(response => {
            return response.data as unknown as ILeilaoPaginacao;
        })
        .then((dados: ILeilaoPaginacao) => {
            console.log(dados);
            return dados;
        })
        .catch(error => {
            return Promise.reject(baseService.defaultErro(error));
        });
}

function getLeilaoId(leilao_id: string): Promise<ILeilao> {
    return baseService.getApi().get(`/leilao/${leilao_id}`)
        .then(response => {
            return response.data as unknown as ILeilao;
        })
        .then((dados : ILeilao) => {
            return dados;
        })
        .catch(error => {
            return Promise.reject(baseService.defaultErro(error));
        });

}