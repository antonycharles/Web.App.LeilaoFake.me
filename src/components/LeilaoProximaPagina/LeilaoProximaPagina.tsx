import React from "react";
import { Container, Button, Grid } from '@mui/material';
import LeiloesPaginacaoContext from "../../contexts/LeiloesPaginacaoContext";
import { leiloesService } from "../../services/leilao.service";
import { ILeilaoPaginacao } from "../../interfaces/leilao.paginacao";
import { leiloesPaginacaoModel } from "../../models/leiloes.paginacao.model";

export default function LeilaoProximaPagina() {
    const leiloesPaginacaoContext = React.useContext(LeiloesPaginacaoContext);

    const isProximaPagina = (): boolean => {
        const proximaPagina = leiloesPaginacaoContext.dados.links.filter(item => item.rel === "proxima_pagina");
        return proximaPagina.length > 0;
    }

    const handleButtonMaisClick = () => {
        const dados = leiloesPaginacaoModel.proximaPagina(leiloesPaginacaoContext.dados);
        leiloesService.getLeiloes(dados)
            .then((dados: ILeilaoPaginacao) => {
                leiloesPaginacaoContext.setDados(leiloesPaginacaoModel.updateDados(
                    leiloesPaginacaoContext.dados,
                    dados
                ))
            }).catch(erros => {
                console.log(erros);
            });
    }

    return (
        <Container sx={{ mt: '20px', mb: '20px' }}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                {isProximaPagina() &&
                    <Button variant="contained" onClick={handleButtonMaisClick}>
                        Mais
                    </Button>
                }
            </Grid>
        </Container>
    )
}