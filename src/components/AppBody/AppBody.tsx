import { Container, Grid } from '@mui/material';
import React from 'react';
import LeilaoCard from '../LeilaoCard';

export default function AppBody() {
    return (
        <Container sx={{mt:'20px'}}>
            <Grid container spacing={2} columns={{ xs: 1, sm: 8, md: 12 }} >
                <Grid item xs={1} sm={4} md={4}>
                    <LeilaoCard title="Teste de Valores modelos como vai" />
                </Grid>
                <Grid item xs={1} sm={4} md={4}>
                    <LeilaoCard title="Teste de Valores" />
                </Grid>
                <Grid item xs={1} sm={4} md={4}>
                    <LeilaoCard title="Teste de Valores" />
                </Grid>
                <Grid item xs={1} sm={4} md={4}>
                    <LeilaoCard title="Teste de Valores" />
                </Grid>
                <Grid item xs={1} sm={4} md={4}>
                    <LeilaoCard title="Teste de Valores" />
                </Grid>
            </Grid>
        </Container>

    );
}