import LeilaoList from "components/LeilaoList";
import LeilaoProximaPagina from "components/LeilaoProximaPagina";
import LeiloesPaginacaoContext from "contexts/LeiloesPaginacaoContext";
import IErroDefault from "interfaces/erro.default";
import ILeilaoPaginacao from "interfaces/leilao.paginacao";
import ILink from "interfaces/link";
import { leiloesPaginacaoModel } from "models/leiloes.paginacao.model";
import React, { useEffect } from "react";
import { leilaoService } from "services/leilao.service";

function HomePage(props: {
    isMeusLeiloes: boolean
}) {
    const leiloesPaginacaoContext = React.useContext(LeiloesPaginacaoContext);

    useEffect(() => {
        if(props.isMeusLeiloes){
            leiloesPaginacaoContext.setDados(leiloesPaginacaoModel.meusLeiloes())
        }else{
            leiloesPaginacaoContext.setDados(leiloesPaginacaoModel.defaultValue())
        }
    },[props.isMeusLeiloes])

    useEffect(() => {
        leilaoService.getLeiloes(leiloesPaginacaoContext.dados)
            .then((dados: ILeilaoPaginacao) => {
                if (leiloesPaginacaoContext.dados.total === 0 && dados.resultados.length > 0)
                    leiloesPaginacaoContext.setDados(dados);
            }).catch((erros: IErroDefault) => {
                console.log(erros);
            });
    }, [leiloesPaginacaoContext.dados.meusLeiloes]);

    const isProximaPagina = (): boolean => {
        const proximaPagina = leiloesPaginacaoContext.dados.links.filter((item: ILink) => item.rel === "proxima_pagina");
        return proximaPagina.length > 0;
    }

    const handleButtonMaisClick = () => {
        const dados = leiloesPaginacaoModel.proximaPagina(leiloesPaginacaoContext.dados);
        leilaoService.getLeiloes(dados)
            .then((dados: ILeilaoPaginacao) => {
                leiloesPaginacaoContext.setDados(leiloesPaginacaoModel.updateDados(
                    leiloesPaginacaoContext.dados,
                    dados
                ))
            }).catch(erros => {
                console.log(erros);
            });
    }

    /*
    const handleSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();

        const dados = leiloesPaginacaoModel.mudancaPesquisa(leiloesPaginacaoContext.dados, search);
        leilaoService.getLeiloes(dados)
            .then((dados: ILeilaoPaginacao) => {
                leiloesPaginacaoContext.setDados(dados);
            }).catch(erros => {
                console.log(erros);
            });
    }*/

    return (
        <>
            <LeilaoList
                leilaoPaginacao={leiloesPaginacaoContext.dados} />
            <LeilaoProximaPagina
                isProximaPagina={isProximaPagina()}
                clickButtonMaisLeiloes={handleButtonMaisClick} />
        </>
    );
}

export default HomePage;