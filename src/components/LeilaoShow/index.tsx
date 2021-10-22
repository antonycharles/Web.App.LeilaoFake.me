import React from 'react';
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { DateRange, AttachMoney, KeyboardArrowRight } from '@mui/icons-material';
import { datasService } from 'services/datas.service';
import LancesShow from 'components/LancesShow';
import ILeilao from 'interfaces/leilao';
import { deepOrange } from '@mui/material/colors';

function LeilaoShow(props: {
    leilao: ILeilao,
    leilaoShowStack: JSX.Element,
    lanceForm?: JSX.Element
}) {

    if (props.leilao === undefined) return null;

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
                            <ListItemText primary="Data início" secondary={datasService.apresentacaoData(props.leilao.dataInicio)} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: deepOrange[500] }}>
                                    <DateRange />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Data fim" secondary={datasService.apresentacaoData(props.leilao.dataFim)} />
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
                    {props.leilaoShowStack}
                    <Typography variant="body1" component="p" sx={{ mt: '30px' }} >{props.leilao.descricao}</Typography>
                    {props.leilao.lances.length > 0 &&
                        <LancesShow leilao={props.leilao} />
                    }
                    {props.lanceForm}
                </Grid>
            </Grid>
        </>
    );
}

export default LeilaoShow;