import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import AppFormErro from 'components/AppFormErro';
import { leilaoService } from 'services/leilao.service'
import IErroDefault from 'interfaces/erro.default';
import ILeilao from 'interfaces/leilao';
import moment from 'moment';
import LeiloesPaginacaoContext from 'contexts/LeiloesPaginacaoContext';
import { leiloesPaginacaoModel } from 'models/leiloes.paginacao.model';

function LeilaoIncluirModal() {
    const [titulo, setTitulo] = React.useState("");
    const [lanceMinimo, setLanceMinimo] = React.useState("");
    const [dataInicio, setDataInicio] = React.useState("");
    const [dataFim, setDataFim] = React.useState("");
    const [descricao, setDescricao] = React.useState("");

    const [erroMessage, setErroMessage] = React.useState({})

    const leiloesPaginacaoContext = React.useContext(LeiloesPaginacaoContext);

    let history = useHistory();

    const handleClose = (event: any) => {
        event.stopPropagation();
        history.goBack();
    };

    const handleSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();
        event.stopPropagation();

        
        leilaoService.incluir({
            titulo,
            descricao,
            lanceMinimo:parseFloat(lanceMinimo),
            dataInicio:moment.utc(moment(dataInicio).utc()).format(),
            dataFim:moment.utc(moment(dataFim).utc()).format()
        })
            .then((resultado: ILeilao) => {
                setErroMessage({})
                leiloesPaginacaoContext.setDados(leiloesPaginacaoModel.meusLeiloes())
                history.goBack();
            })
            .catch((erros: IErroDefault) => {
                setErroMessage(erros)
            })
    }

    return (
        <div>
            <Dialog open={true} onClose={handleClose} fullWidth={true} maxWidth="md">
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Novo leilão</DialogTitle>
                    <DialogContent
                        sx={{
                            '& .MuiTextField-root': { mt: '10px' },
                        }}>
                        <AppFormErro erro={erroMessage} />
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <TextField
                                    autoFocus
                                    id="titulo"
                                    name="titulo"
                                    label="Título"
                                    type="nome"
                                    value={titulo}
                                    onChange={event => setTitulo(event.target.value)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="lanceMinimo"
                                    name="lanceMinimo"
                                    value={lanceMinimo}
                                    onChange={event => setLanceMinimo(event.target.value)}
                                    label="Lance mínimo"
                                    type="number"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="dataInicio"
                                    name="dataInicio"
                                    value={dataInicio}
                                    onChange={event => setDataInicio(event.target.value)}
                                    label="Data início"
                                    type="datetime-local"
                                    fullWidth
                                    required
                                    focused
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="dataFim"
                                    name="dataFim"
                                    value={dataFim}
                                    onChange={event => setDataFim(event.target.value)}
                                    label="Data fim"
                                    type="datetime-local"
                                    fullWidth
                                    required
                                    focused
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Descrição"
                                    name="descricao"
                                    value={descricao}
                                    onChange={event => setDescricao(event.target.value)}
                                    multiline
                                    fullWidth
                                    rows={4}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="error">Sair</Button>
                        <Button type="submit" color="success">Incluir</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default LeilaoIncluirModal;