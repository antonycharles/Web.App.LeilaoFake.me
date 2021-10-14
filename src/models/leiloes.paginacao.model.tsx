import {ILeilaoPaginacao} from '../interfaces/leilao.paginacao'

export const leiloesPaginacaoModel = {
    defaultValue,
};

function defaultValue(): ILeilaoPaginacao {

    return {
        search: "",
        pagina: 1,
        total: 0,
        porPagina: 9,
        order: "",
        resultados: [],
        links: []
    }
}

