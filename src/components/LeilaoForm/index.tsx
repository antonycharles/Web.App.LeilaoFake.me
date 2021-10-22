import { Box, Button, Grid, TextField } from "@mui/material";
import AppFormErro from "components/AppFormErro";
import IErroDefault from "interfaces/erro.default";
import ILeilao from "interfaces/leilao";
import ILeilaoIncluir from "interfaces/leilao.incluir";
import React, { useEffect } from "react";
import { datasService } from "services/datas.service";

export default function LeilaoForm(props: {
    btnSubmitTexto: string,
    btnSubmit: (leilaoIncluir: ILeilaoIncluir) => void,
    btnSair: (event: React.FormEvent<EventTarget>) => void,
    errosMensage: IErroDefault,
    setErrosMensage: React.Dispatch<React.SetStateAction<IErroDefault>>,
    leilao: ILeilao
}) {
    const [titulo, setTitulo] = React.useState("");
    const [lanceMinimo, setLanceMinimo] = React.useState("");
    const [dataInicio, setDataInicio] = React.useState("");
    const [dataFim, setDataFim] = React.useState("");
    const [descricao, setDescricao] = React.useState("");

    const handleSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();
        event.stopPropagation();

        props.btnSubmit({
            titulo,
            descricao,
            lanceMinimo: parseFloat(lanceMinimo),
            dataInicio: datasService.convertDataLocalToDataUtcString(dataInicio),
            dataFim: datasService.convertDataLocalToDataUtcString(dataFim)
        });
    }

    useEffect(() => {
        if (props.leilao.titulo !== undefined) {
            setTitulo(props.leilao.titulo);
            setLanceMinimo(props.leilao.lanceMinimo.toString());
            setDataInicio(datasService.formataToInput(props.leilao.dataInicio));
            setDataFim(datasService.formataToInput(props.leilao.dataFim));
            setDescricao(props.leilao.descricao);
        }
    }, [props.leilao])


    return (
        <form onSubmit={handleSubmit}>
            <AppFormErro erro={props.errosMensage} />
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
            <Box sx={{ mt: '15px', textAlign: 'end' }}>
                <Button onClick={props.btnSair} color="error">Sair</Button>
                <Button type="submit" color="success" variant="contained">{props.btnSubmitTexto}</Button>
            </Box>
        </form>
    );
}