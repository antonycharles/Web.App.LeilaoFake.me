import React from 'react';
import { Avatar, Button, Grid, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import { DateRange, AttachMoney } from '@mui/icons-material';
import ILeilao from 'interfaces/leilao';
import moment from 'moment';
import ILink from 'interfaces/link';
import { leilaoService } from 'services/leilao.service';
import IErroDefault from 'interfaces/erro.default';
import AppFormErro from '../AppFormErro';
import { useHistory } from 'react-router-dom';
import { leiloesPaginacaoModel } from 'models/leiloes.paginacao.model';
import LeiloesPaginacaoContext from 'contexts/LeiloesPaginacaoContext';

function LeilaoShow(props: { leilao: ILeilao }) {
    const [erroMessage, setErroMessage] = React.useState({})
    let history = useHistory();
    
    const leiloesPaginacaoContext = React.useContext(LeiloesPaginacaoContext);

    if (props.leilao === undefined) return null;

    const apresentacaoData = (data: Date | undefined): string => {
        return moment.utc(data).local().format('DD/MM/YYYY HH:mm:ss');
    }

    const apresentacaoValor = (valor: number | undefined) => {
        return valor?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }

    const handleButtonlick = (url: string, metodo: string, mensagem: string) => {
        console.log(url);
        console.log(metodo);
        console.log(mensagem);
    }

    const handleButtonDeleteclick = (url: string) => {
        leilaoService.deletar(url)
            .then(response => {
                history.go(-1);
                leiloesPaginacaoContext.setDados(leiloesPaginacaoModel.meusLeiloes())
            })
            .catch((erros: IErroDefault) => {
                setErroMessage(erros)
            })
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <img src="https://via.placeholder.com/350X300" style={{ width: '100%' }} />
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <DateRange />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Data início" secondary={apresentacaoData(props.leilao.dataInicio)} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <DateRange />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Data fim" secondary={apresentacaoData(props.leilao.dataFim)} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <AttachMoney />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Lance mínimo" secondary={apresentacaoValor(props.leilao.lanceMinimo)} />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" component="h2" gutterBottom>{props.leilao.titulo}</Typography>
                    <AppFormErro erro={erroMessage} />
                    <Stack spacing={2} direction="row">
                        {props.leilao.links.map((item: ILink, index) => {
                            if (item.rel === "update") {
                                return (
                                    <Button
                                        key={index}
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => {
                                            handleButtonlick(item.href, item.metodo, 'Leilão alterado com sucesso!');
                                        }}
                                    >Alterar</Button>);
                            }

                            if (item.rel === "delete") {
                                return (
                                    <Button
                                        key={index}
                                        variant="outlined"
                                        color="error"
                                        onClick={() => {
                                            handleButtonDeleteclick(item.href);
                                        }}
                                    >Deletar</Button>);
                            }

                            if (item.rel === "iniciar_pregao") {
                                return (
                                    <Button
                                        key={index}
                                        variant="outlined"
                                        color="success"
                                        onClick={() => {
                                            handleButtonlick(item.href, item.metodo, 'Pregão iniciado com sucesso!');
                                        }}
                                    >Inícia pregão</Button>);
                            }

                            if (item.rel === "cancelar") {
                                return (
                                    <Button
                                        key={index}
                                        variant="outlined"
                                        color="warning"
                                        onClick={() => {
                                            handleButtonlick(item.href, item.metodo, 'Leilão cancelado com sucesso!');
                                        }}
                                    >Cancelar</Button>);
                            }

                            if (item.rel === "tornar_publico") {
                                return (
                                    <Button
                                        key={index}
                                        variant="outlined"
                                        color="info"
                                        onClick={() => {
                                            handleButtonlick(item.href, item.metodo, 'Leilão público com sucesso!');
                                        }}
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