import React from "react"
import { AppBar, Toolbar, Container, Typography } from '@mui/material';

export default function AppFooter() {
    return (
        <AppBar position="static" color="default">
          <Container>
            <Toolbar>
              <Typography variant="body1" sx={{margin:'auto'}}>
                © 2021 Leilão Fake - <a href="https://antonycharles.com.br/" style={{textDecoration:'none'}} target="_blank">AntonyCharles</a>
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    )
}