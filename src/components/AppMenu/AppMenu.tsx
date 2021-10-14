import React from 'react';
import { ControlPoint, Search } from '@mui/icons-material';
import { Breadcrumbs, Button, ButtonGroup, Container, Grid, InputAdornment, Link, TextField } from '@mui/material';
import AutenticadoContext from '../../contexts/AutenticadoContext';
import LeilaoForm from '../LeilaoForm';

export default function AppMenu() {
    const [openModalNovoLeilao, setOpenModalNovoLeilao] = React.useState(false);
    const [value, setValue] = React.useState(2);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const autenticacaoContext = React.useContext(AutenticadoContext);

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
                        <form>
                            <TextField
                                id="standard-basic"
                                label=""
                                placeholder="Pesquisa..."
                                variant="standard"
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
                            <Button sx={{ color: 'text.primary' }}>Leilões</Button>
                            {autenticacaoContext.autenticado.authenticated &&
                                <Button sx={{ color: 'text.primary' }}>Meus leilões</Button>
                            }
                            {autenticacaoContext.autenticado.authenticated &&
                                <Button
                                    variant="text"
                                    color="success"
                                    onClick={() => { setOpenModalNovoLeilao(true) }}> Adicionar</Button>
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