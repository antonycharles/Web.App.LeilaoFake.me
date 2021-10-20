import React from 'react';
import { Search } from '@mui/icons-material';
import { Container, Grid, InputAdornment, Link, TextField } from '@mui/material';
import AutenticadoContext from 'contexts/AutenticadoContext';
import LeiloesPaginacaoContext from 'contexts/LeiloesPaginacaoContext';
import { leiloesPaginacaoModel } from 'models/leiloes.paginacao.model';
import ILeilaoPaginacao from 'interfaces/leilao.paginacao';
import { leilaoService } from 'services/leilao.service';

export default function AppMenu() {
    const [openModalNovoLeilao, setOpenModalNovoLeilao] = React.useState(false);
    const [search, setSearch] = React.useState("");

    const autenticacaoContext = React.useContext(AutenticadoContext);
    const leiloesPaginacaoContext = React.useContext(LeiloesPaginacaoContext);

    const handleSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();

        const dados = leiloesPaginacaoModel.mudancaPesquisa(leiloesPaginacaoContext.dados, search);
        leilaoService.getLeiloes(dados)
            .then((dados: ILeilaoPaginacao) => {
                leiloesPaginacaoContext.setDados(dados);
            }).catch(erros => {
                console.log(erros);
            });
    }

    return (
        <React.Fragment>
            <Container sx={{ bgcolor: '#e9e9e9', p: '10px' }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                >
                    <Grid>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                id="search"
                                label=""
                                placeholder="Pesquisa..."
                                variant="standard"
                                value={search}
                                onChange={event => setSearch(event.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </form>
                    </Grid>
                    <Grid>
                        
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}