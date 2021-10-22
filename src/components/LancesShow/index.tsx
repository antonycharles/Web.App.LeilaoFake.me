import React from "react";
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { datasService } from 'services/datas.service';
import ILeilao from 'interfaces/leilao';
import { Person } from "@mui/icons-material";
import moment from "moment";
import ILance from "interfaces/lance";

function LancesShow(props: {
    leilao: ILeilao
}) {
    const apresentacaoValor = (valor: number | undefined) => {
        return valor?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }

    const ordenaLancesDecrescente = (a:ILance, b:ILance) => {
        const d1 = moment(a.criadoEm);
        const d2 = moment(b.criadoEm);
        if (d1.isAfter(d2)) {
            return -1;
        } else if (d1.isBefore(d2)) {
            return 1;
        }
        return 0;
    }

    return (
        <>
            <Typography variant="h5" sx={{ mt: '20px', bgcolor: 'background.paper' }}>Lances:</Typography>
            <Divider />
            {props.leilao.lances.length > 0 &&
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {props.leilao.lances.sort(ordenaLancesDecrescente).map(item => {
                        return (
                            <ListItem key={item.id} secondaryAction={
                                <Typography variant="h6">
                                    {apresentacaoValor(item.valor)}
                                </Typography>
                            }>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Person />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.interessado.nome} secondary={datasService.apresentacaoData(item.criadoEm)} />
                            </ListItem>
                        );
                    })}
                </List>
            }
        </>
    );
}

export default LancesShow;