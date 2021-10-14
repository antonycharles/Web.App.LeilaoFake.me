import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import LeiloesPaginacaoContext from '../../contexts/LeiloesPaginacaoContext';
import { ILeilaoPaginacao } from '../../interfaces/leilao.paginacao';
import { leiloesService } from '../../services/leilao.service';
import AppMenu from '../AppMenu';
import LeilaoList from '../LeilaoList';

export default function AppBody() {
    const leiloesPaginacaoContext = React.useContext(LeiloesPaginacaoContext);

    useEffect(() => {
        // Update the document title using the browser API
        if(leiloesPaginacaoContext.dados.total == 0){
            leiloesService.getLeiloesPublicos(leiloesPaginacaoContext.dados)
            .then((dados: ILeilaoPaginacao) => {
                leiloesPaginacaoContext.setDados(dados);
            }).catch(erros => {
                console.log(erros);
            });
        }
    });

    return (
        <LeilaoList />
    );
}