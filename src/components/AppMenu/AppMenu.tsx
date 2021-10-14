import React from 'react';
import { ControlPoint, Logout, Search, Settings } from '@mui/icons-material';
import { Button, Container, Grid, InputAdornment, TextField } from '@mui/material';
import AutenticadoContext from '../../contexts/AutenticadoContext';
import LeilaoForm from '../LeilaoForm';

export default function AppMenu() {
    const [openModalNovoLeilao, setOpenModalNovoLeilao] = React.useState(false);

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
                        {autenticacaoContext.autenticado.authenticated &&
                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<ControlPoint />}
                                onClick={() => {setOpenModalNovoLeilao(true)}}> Leilão</Button>
                        }
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