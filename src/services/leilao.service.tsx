import ILeilaoPaginacao from "interfaces/leilao.paginacao";
import ILeilao from "interfaces/leilao";
import ILeilaoIncluir from "interfaces/leilao.incluir";
import { baseService } from "./base.service";

export const leilaoService = {
    getLeiloes,
    getLeilaoId,
    incluir,
    executaPatch,
    deletar,
    update
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

function incluir(leilao : ILeilaoIncluir) : Promise<ILeilao> {
    return baseService.getApi().post('/leilao',leilao)
        .then(response => {
            return response.data as unknown as ILeilao;
        })
        .then((dados : ILeilao) => {
            return dados;
        })
        .catch(error => {
            return Promise.reject(baseService.defaultErro(error));
        })
}

function update(url:string, leilao : ILeilaoIncluir) : Promise<string>{
    return baseService.getApi().put(url,leilao)
        .then(response => {
            return 'Leilão alterado com sucesso!'
        })
        .catch(error => {
            return Promise.reject(baseService.defaultErro(error));
        })
}

function executaPatch(url:string, mensagemSucesso:string) : Promise<string> {
    return  baseService.getApi().patch(url)
    .then(response => {
        return mensagemSucesso;
    })
    .catch(error => {
        return Promise.reject(baseService.defaultErro(error));
    });
}

function deletar(url:string) : Promise<string> {
    return baseService.getApi().delete(url)
    .then(response => {
        return 'Leilão deletado com sucesso!';
    })
    .catch(error => {
        return Promise.reject(baseService.defaultErro(error));
    });
}