import React from 'react';
import { Avatar, Button, Grid, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import { DateRange, AttachMoney, KeyboardArrowRight } from '@mui/icons-material';
import ILeilao from 'interfaces/leilao';
import moment from 'moment';
import ILink from 'interfaces/link';
import { deepOrange } from '@mui/material/colors';

function LeilaoShow(props: {
    leilao: ILeilao,
    clickButtonDeletarLeilao: (url: string) => void,
    clickButtonExecutaPatch: (url: string, mensagem: string) => void
}) {

    if (props.leilao === undefined) return null;

    const apresentacaoData = (data: Date | undefined): string => {
        return moment.utc(data).local().format('DD/MM/YYYY HH:mm:ss');
    }

    const apresentacaoValor = (valor: number | undefined) => {
        return valor?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <img src="https://via.placeholder.com/350X300" style={{ width: '100%' }} alt="place holder" />
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: deepOrange[500] }}>
                                    <KeyboardArrowRight />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Status" secondary={props.leilao.status} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: deepOrange[500] }}>
                                    <DateRange />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Data início" secondary={apresentacaoData(props.leilao.dataInicio)} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: deepOrange[500] }}>
                                    <DateRange />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Data fim" secondary={apresentacaoData(props.leilao.dataFim)} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: deepOrange[500] }}>
                                    <AttachMoney />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Lance mínimo" secondary={apresentacaoValor(props.leilao.lanceMinimo)} />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" component="h2" gutterBottom>{props.leilao.titulo}</Typography>
                    <Stack spacing={2} direction="row">
                        {props.leilao.links.map((item: ILink, index) => {
                            if (item.rel === "update") {
                                return (
                                    <Button
                                        key={index}
                                        variant="outlined"
                                        color="secondary"
                                    // onClick={ () => props.clickButtonExecutaPatch(item.href, item.metodo, 'Leilão alterado com sucesso!') }
                                    >Alterar</Button>);
                            }

                            if (item.rel === "delete") {
                                return (
                                    <Button
                                        key={index}
                                        variant="outlined"
                                        color="error"
                                        onClick={() => props.clickButtonDeletarLeilao(item.href)}
                                    >Deletar</Button>);
                            }

                            if (item.rel === "iniciar_pregao") {
                                return (
                                    <Button
                                        key={index}
                                        variant="outlined"
                                        color="success"
                                        onClick={() => props.clickButtonExecutaPatch(item.href, 'Leilão alterado com sucesso!')}
                                    >Inícia pregão</Button>);
                            }

                            if (item.rel === "cancelar") {
                                return (
                                    <Button
                                        key={index}
                                        variant="outlined"
                                        color="warning"
                                        onClick={() => props.clickButtonExecutaPatch(item.href, 'Leilão alterado com sucesso!')}
                                    >Cancelar</Button>);
                            }
                            
                            if (item.rel === "finalizar") {
                                return (
                                    <Button
                                        key={index}
                                        variant="outlined"
                                        color="inherit"
                                        onClick={() => props.clickButtonExecutaPatch(item.href, 'Leilão finalizado com sucesso!')}
                                    >Finalizar</Button>)
                            }

                            if (item.rel === "tornar_publico") {
                                return (
                                    <Button
                                        key={index}
                                        variant="outlined"
                                        color="info"
                                        onClick={() => props.clickButtonExecutaPatch(item.href, 'Leilão alterado com sucesso!')}
                                    >Tornar público</Button>)
                            }
                        })}
                    </Stack>
                    <Typography variant="body1" component="p" sx={{ mt: '30px' }} >{props.leilao.descricao}</Typography>
                </Grid>
            </Grid>
        </>
    );
}

export default LeilaoShow;