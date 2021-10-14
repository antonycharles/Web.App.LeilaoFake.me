import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { ControlPoint, Logout, Search, Settings } from '@mui/icons-material';
import { Button, Container, Grid, InputAdornment, TextField } from '@mui/material';
import AppLogar from '../AppLogar';
import AppCadastro from '../AppCadastro';
import AutenticadoContext from '../../contexts/AutenticadoContext';
import { autenticadoModel } from '../../models/autenticado.model';

export default function AppHeader() {
    const [openModalLogar, setOpenModalLogar] = React.useState(false);
    const [openModalCadastro, setOpenModalCadastro] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const autenticacaoContext = React.useContext(AutenticadoContext);

    const handleClickOpenModalLogar = () => {
        setOpenModalLogar(true);
    };

    const handleClickOpenModalCadastro = () => {
        setOpenModalCadastro(true);
    };


    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickSair = () => {
        autenticacaoContext.setAuthenticated(autenticadoModel.naoAutenticado());
    }

    const getPrimeiraLetraNome = () => {
        try {
            if (autenticacaoContext.autenticado.usuario.nome === "")
                return 'L';

            return autenticacaoContext.autenticado.usuario.nome.substr(0, 1).toUpperCase();
        } catch {
            return 'L'
        }
    }

    return (
        <React.Fragment>
            <Container>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', paddingBottom: '10px' }}>
                    <Typography variant="h4" component="h1"><b>Leilão Fake</b></Typography>
                    <Tooltip title="Account settings">
                        <IconButton onClick={handleClick} size="small" sx={{ ml: 2, }}>
                            <Avatar sx={{ bgcolor: 'warning.main' }}>{getPrimeiraLetraNome()}</Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
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
                        <MenuItem onClick={handleClickOpenModalLogar}>Logar</MenuItem>
                    }
                    {!autenticacaoContext.autenticado.authenticated &&
                        <MenuItem onClick={handleClickOpenModalCadastro}>Inscreva-se</MenuItem>
                    }
                    {autenticacaoContext.autenticado.authenticated &&
                        <MenuItem>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Meus leilões
                        </MenuItem>
                    }
                    {autenticacaoContext.autenticado.authenticated &&
                        <MenuItem onClick={handleClickSair}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Sair
                        </MenuItem>
                    }
                </Menu>
            </Container>
            <AppLogar openModal={openModalLogar} closeModal={setOpenModalLogar} />
            <AppCadastro openModal={openModalCadastro} closeModal={setOpenModalCadastro} />
        </React.Fragment>
    );
}