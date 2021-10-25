import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Logout } from '@mui/icons-material';
import { Button, ButtonGroup, Container, ListItemIcon } from '@mui/material';
import AutenticadoContext from 'contexts/AutenticadoContext';
import LeiloesPaginacaoContext from "contexts/LeiloesPaginacaoContext";
import { leiloesPaginacaoModel } from "models/leiloes.paginacao.model";
import { autenticadoModel } from 'models/autenticado.model';
import { useHistory, useLocation } from 'react-router-dom';

export default function AppHeader() {
    let location = useLocation();
    let history = useHistory();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const autenticacaoContext = React.useContext(AutenticadoContext);
    const leiloesPaginacaoContext = React.useContext(LeiloesPaginacaoContext);

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickSair = () => {
        autenticadoModel.sair()
        autenticacaoContext.setAuthenticated(autenticadoModel.userAutenticado());
        history.push('/')

    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getPrimeiroNome = () => {
        try {
            if (autenticacaoContext.autenticado.usuario.nome === "")
                return '';

            return autenticacaoContext.autenticado.usuario.nome.split(' ')[0];
        } catch {
            return ''
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="default">
                <Container>
                    <Toolbar>
                        <Typography variant="h4" component="h1" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                            Leilão Fake
                        </Typography>
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleClick}
                                color="inherit"
                                sx={{ borderRadius: '5%' }}
                            >
                                <Typography sx={{ textTransform: 'capitalize' }}>{getPrimeiroNome()}</Typography>
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                {!autenticacaoContext.autenticado.authenticated &&
                                    <MenuItem component="a" onClick={(event: any) => {
                                        event.stopPropagation();
                                        handleClose();
                                        history.push(`/login`, { background: location });
                                    }}>
                                        Logar</MenuItem>
                                }
                                {!autenticacaoContext.autenticado.authenticated &&
                                    <MenuItem component="a" onClick={(event: any) => {
                                        event.stopPropagation();
                                        handleClose();
                                        history.push(`/cadastro`, { background: location });
                                    }}>Inscreva-se</MenuItem>
                                }
                                {autenticacaoContext.autenticado.authenticated &&
                                    <MenuItem component="a" onClick={handleClickSair}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Sair
                                    </MenuItem>
                                }
                            </Menu>
                        </div>
                    </Toolbar>
                </Container>
                <Container>
                    <ButtonGroup variant="text" aria-label="text button group" color="inherit" fullWidth={true}>
                        <Button
                            sx={{ color: 'text.primary' }}
                            onClick={() => {
                                leiloesPaginacaoContext.setDados(leiloesPaginacaoModel.refrash(leiloesPaginacaoContext.dados))
                                history.push({
                                    pathname:'/',
                                    search:''
                                })
                            }}
                        >Leilões</Button>
                        {autenticacaoContext.autenticado.authenticated &&
                            <Button
                                sx={{ color: 'text.primary' }}
                                onClick={() => {
                                    leiloesPaginacaoContext.setDados(leiloesPaginacaoModel.refrash(leiloesPaginacaoContext.dados))
                                    history.push({
                                        pathname:'/',
                                        search:'meus_leiloes=true'
                                    })
                                }}
                            >Meus leilões</Button>
                        }
                        {autenticacaoContext.autenticado.authenticated &&
                            <Button
                                variant="text"
                                color="success" onClick={(event: any) => {
                                    event.stopPropagation();
                                    history.push(`/leilao/incluir`, { background: location });
                                }}> Adiciona</Button>
                        }
                    </ButtonGroup>
                </Container>
            </AppBar>
        </Box>
    );
}
