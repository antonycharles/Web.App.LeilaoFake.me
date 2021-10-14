import { Container, Grid } from "@mui/material";
import LeilaoCard from '../LeilaoCard'
import React, { useEffect } from "react";
import LeiloesPaginacaoContext from "../../contexts/LeiloesPaginacaoContext";

export default function LeilaoList() {
    const leiloesPaginacaoContext = React.useContext(LeiloesPaginacaoContext);

    useEffect(() => {
        console.log('Dados leilão list')
        console.log(leiloesPaginacaoContext.dados);
    })

    return (
        <Container sx={{ mt: '20px' }}>
            <Grid container spacing={2} columns={{ xs: 1, sm: 8, md: 12 }} >
                {leiloesPaginacaoContext.dados.resultados.map((item) => {
                    return (
                        <Grid key={item.id} item xs={1} sm={4} md={4}>
                            <LeilaoCard title={item.titulo} />
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
}