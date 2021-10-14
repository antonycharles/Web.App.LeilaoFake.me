import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@mui/material";
import React from "react";

export default function LeilaoForm(props: {
    title: string,
    btnAcao: string,
    funcaoAcao:any,
    openModal: boolean,
    changeModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [titulo, setTitulo] = React.useState("");
    const [lanceMinimo, setLanceMinimo] = React.useState("");
    const [dataInicio, setDataInicio] = React.useState("");
    const [dataFim, setDataFim] = React.useState("");
    const [descricao, setDescricao] = React.useState("");
    
    const handleClose = () => {
        props.changeModal(false);
    };

    const handleSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();
        console.log('titulo => ' + titulo)
        console.log('lanceMinimo => ' + lanceMinimo)
        console.log('dataInicio => ' + dataInicio)
        console.log('dataFim => ' + dataFim)
        console.log('descricao => ' + descricao)
    }

    return (
        <div>
            <Dialog open={props.openModal} onClose={handleClose} fullWidth={true} maxWidth="md" sx={{ mt: '-25%' }}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>{props.title}</DialogTitle>
                    <DialogContent
                        sx={{
                            '& .MuiTextField-root': { mt: '10px' },
                        }}>
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