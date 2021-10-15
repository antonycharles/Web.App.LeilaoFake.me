import {ILeilaoPaginacao} from '../interfaces/leilao.paginacao'

export const leiloesPaginacaoModel = {
    defaultValue,
    meusLeiloes,
    updateDados,
    proximaPagina,
    mudancaPesquisa
};

function defaultValue() : ILeilaoPaginacao {

    return {
        search: "",
        pagina: 1,
        total: 0,
        porPagina: 9,
        order: "",
        meusLeiloes: false,
        resultados: [],
        links: []
    }
}

function meusLeiloes() : ILeilaoPaginacao{
    let valorDefault = defaultValue();
    valorDefault.meusLeiloes = true;

    return valorDefault;
}

function proximaPagina(dados:ILeilaoPaginacao) : ILeilaoPaginacao{
    dados.pagina = dados.pagina + 1;
    return dados;
}

function mudancaPesquisa(dados:ILeilaoPaginacao, search:string) : ILeilaoPaginacao {
    const valorDefault = defaultValue();
    valorDefault.search = search;
    valorDefault.meusLeiloes = dados.meusLeiloes;
    return valorDefault;
}

function updateDados(dadosAtuais:ILeilaoPaginacao, dadosNovos:ILeilaoPaginacao) : ILeilaoPaginacao{
    const resultadosConcat = dadosAtuais.resultados.concat(dadosNovos.resultados);
    dadosNovos.resultados = resultadosConcat;

    return dadosNovos;
}

