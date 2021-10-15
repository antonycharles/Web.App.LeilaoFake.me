import React from 'react';
import { ControlPoint, Search } from '@mui/icons-material';
import { Breadcrumbs, Button, ButtonGroup, Container, Grid, InputAdornment, Link, TextField } from '@mui/material';
import AutenticadoContext from '../../contexts/AutenticadoContext';
import LeilaoForm from '../LeilaoForm';
import LeiloesPaginacaoContext from '../../contexts/LeiloesPaginacaoContext';
import { leiloesPaginacaoModel } from '../../models/leiloes.paginacao.model';
import { ILeilaoPaginacao } from '../../interfaces/leilao.paginacao';
import { leiloesService } from '../../services/leilao.service';

export default function AppMenu() {
    const [openModalNovoLeilao, setOpenModalNovoLeilao] = React.useState(false);
    const [search, setSearch] = React.useState("");

    const autenticacaoContext = React.useContext(AutenticadoContext);
    const leiloesPaginacaoContext = React.useContext(LeiloesPaginacaoContext);

    const handleSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();

        const dados = leiloesPaginacaoModel.mudancaPesquisa(leiloesPaginacaoContext.dados, search);
        leiloesService.getLeiloesPublicos(dados)
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
                        <ButtonGroup variant="text" aria-label="text button group">
                            <Button
                                sx={{ color: 'text.primary' }}
                                onClick={() => leiloesPaginacaoContext.setDados(leiloesPaginacaoModel.defaultValue())}
                                disabled={leiloesPaginacaoContext.dados.meusLeiloes == false}
                            >Leilões</Button>
                            {autenticacaoContext.autenticado.authenticated &&
                                <Button
                                    sx={{ color: 'text.primary' }}
                                    onClick={() => leiloesPaginacaoContext.setDados(leiloesPaginacaoModel.meusLeiloes())}
                                    disabled={leiloesPaginacaoContext.dados.meusLeiloes}
                                >Meus leilões</Button>
                            }
                            {autenticacaoContext.autenticado.authenticated &&
                                <Button
                                    variant="text"
                                    color="success"
                                    onClick={() => { setOpenModalNovoLeilao(true) }}> Adiciona</Button>
                            }
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </Container>
            <LeilaoForm
                title="Novo leilão"
                btnAcao="Incluir"
                funcaoAcao={() => { }}
                openModal={openModalNovoLeilao}
                changeModal={setOpenModalNovoLeilao}
            />
        </React.Fragment>
    );
}