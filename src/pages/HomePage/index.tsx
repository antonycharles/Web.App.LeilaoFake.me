import { Container } from "@mui/material";
import LeilaoList from "components/LeilaoList";
import LeilaoProximaPagina from "components/LeilaoProximaPagina";
import LeiloesPaginacaoContext from "contexts/LeiloesPaginacaoContext";
import IErroDefault from "interfaces/erro.default";
import ILeilaoPaginacao from "interfaces/leilao.paginacao";
import LeilaoListLoading from "components/LeilaoListLoading";
import ILink from "interfaces/link";
import { leiloesPaginacaoModel } from "models/leiloes.paginacao.model";
import React, { useEffect } from "react";
import { leilaoService } from "services/leilao.service";
import { VariantType, useSnackbar } from 'notistack';

function HomePage(props: {
    isMeusLeiloes: boolean
}) {
    const [loading, setLoading] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const leiloesPaginacaoContext = React.useContext(LeiloesPaginacaoContext);

    useEffect(() => {
        if (props.isMeusLeiloes) {
            leiloesPaginacaoContext.setDados(leiloesPaginacaoModel.meusLeiloes())
        } else {
            leiloesPaginacaoContext.setDados(leiloesPaginacaoModel.defaultValue())
        }
    }, [props.isMeusLeiloes])

    useEffect(() => {
        setLoading(true)
        leilaoService.getLeiloes(leiloesPaginacaoContext.dados)
            .then((dados: ILeilaoPaginacao) => {
                if (leiloesPaginacaoContext.dados.total === 0 && dados.resultados.length > 0)
                    leiloesPaginacaoContext.setDados(dados);
            }).catch((error: IErroDefault) => {
                handleClickVariant(error.message, 'error');
            }).finally(() => {
                setLoading(false);
            });
    }, [leiloesPaginacaoContext.dados.total]);

    const handleClickVariant = (mensagem: string, variant: VariantType) => {
        enqueueSnackbar(mensagem, {
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }, variant: "error"
        });
    }

    const isProximaPagina = (): boolean => {
        const proximaPagina = leiloesPaginacaoContext.dados.links.filter((item: ILink) => item.rel === "proxima_pagina");
        return proximaPagina.length > 0;
    }

    const handleButtonMaisClick = () => {
        setLoading(true)
        const dados = leiloesPaginacaoModel.proximaPagina(leiloesPaginacaoContext.dados);
        leilaoService.getLeiloes(dados)
            .then((dados: ILeilaoPaginacao) => {
                leiloesPaginacaoContext.setDados(leiloesPaginacaoModel.updateDados(
                    leiloesPaginacaoContext.dados,
                    dados
                ))
            }).catch(error => {
                handleClickVariant(error.message, 'error');
            }).finally(() => {
                setLoading(false);
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
        <Container sx={{ mt: '20px' }}>
            {leiloesPaginacaoContext.dados.resultados.length > 0 &&
                    <LeilaoList
                        leilaoPaginacao={leiloesPaginacaoContext.dados} />
            }
            {loading &&
                <LeilaoListLoading />
            }
            {leiloesPaginacaoContext.dados.resultados.length > 0 &&
                <LeilaoProximaPagina
                    isProximaPagina={isProximaPagina()}
                    clickButtonMaisLeiloes={handleButtonMaisClick} />
            }
        </Container>
    );
}

export default HomePage;