import { Container, Typography } from "@mui/material";
import { Error } from '@mui/icons-material';
import React from "react";

export default function Pagina404() {
    return (
        <Container sx={{ mt: '150px' }}>
            <Typography align='center' color='error'><Error  sx={{ fontSize: 120 }} /></Typography>
            <Typography align='center' component='h5' variant='h3'>Erro 404!</Typography>
        </Container>
    )
}