import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { DateRange, AttachMoney } from '@mui/icons-material';
import React from 'react';
import { ILeilao } from '../../interfaces/leilao';
import moment from 'moment';

function LeilaoShow(props: { leilao: ILeilao | undefined }) {

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
                    <img src="https://via.placeholder.com/350X300" style={{ width: '100%' }} />
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <DateRange />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Data início" secondary={apresentacaoData(props.leilao?.dataInicio)} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <DateRange />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Data fim" secondary={apresentacaoData(props.leilao?.dataFim)} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <AttachMoney />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Lance mínimo" secondary={apresentacaoValor(props.leilao?.lanceMinimo)} />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" component="h2" gutterBottom>{props.leilao?.titulo}</Typography>
                    <Typography variant="body1" component="p" >{props.leilao?.descricao}</Typography>
                </Grid>
            </Grid>
        </>
    );
}

export default LeilaoShow;