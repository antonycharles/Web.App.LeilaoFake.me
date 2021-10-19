import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import LeiloesPaginacaoContext from '../../contexts/LeiloesPaginacaoContext';
import { ILeilaoPaginacao } from '../../interfaces/leilao.paginacao';
import { leiloesService } from '../../services/leilao.service';
import AppMenu from '../AppMenu';
import LeilaoProximaPagina from '../LeilaoProximaPagina'
import LeilaoList from '../LeilaoList';
import { IErroDefault } from '../../interfaces/erro.default';

export default function AppBody() {
    const leiloesPaginacaoContext = React.useContext(LeiloesPaginacaoContext);

    useEffect(() => {
        leiloesService.getLeiloes(leiloesPaginacaoContext.dados)
            .then((dados: ILeilaoPaginacao) => {
                if (leiloesPaginacaoContext.dados.total == 0 && dados.resultados.length > 0)
                    leiloesPaginacaoContext.setDados(dados);
            }).catch((erros:IErroDefault) => {
                console.log(erros);
            });
    },[leiloesPaginacaoContext.dados]);

    return (
        <>
            <LeilaoList />
            <LeilaoProximaPagina />
        </>
    );
}