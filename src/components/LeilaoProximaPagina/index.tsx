import React from "react";
import { Container, Button, Grid } from '@mui/material';

export default function LeilaoProximaPagina(props: {
    isProximaPagina: boolean,
    clickButtonMaisLeiloes: () => void
}) {
    return (
        <Container sx={{ mt: '20px', mb: '20px' }}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                {props.isProximaPagina &&
                    <Button variant="contained" onClick={props.clickButtonMaisLeiloes}>
                        Mais leilões
                    </Button>
                }
            </Grid>
        </Container>
    )
}