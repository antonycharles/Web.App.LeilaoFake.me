import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { Logout, Settings } from '@mui/icons-material';
import { Container } from '@mui/material';
import Logar from '../AppLogar/AppLogar';
import AutenticadoContext from '../../contexts/AutenticadoContext';
import { autenticadoModel } from '../../models/autenticado.model';

export default function AppHeader() {
    const [openModalLogar, setOpenModalLogar] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const autenticacaoContext = React.useContext(AutenticadoContext);

    const handleClickOpenModalLogar = () => {
        setOpenModalLogar(true);
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

    return (
        <React.Fragment>
            <Container sx={{ bgcolor: '#f5f5f5' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', paddingBottom: '10px' }}>
                    <Typography variant="h4" component="h1"><b>Leilão Fake</b></Typography>
                    <Typography sx={{ minWidth: 100 }}>Leilões</Typography>
                    <Tooltip title="Account settings">
                        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                            <Avatar sx={{ width: 32, height: 32 }}>L</Avatar>
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
                        <MenuItem>Inscreva-se</MenuItem>
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
            <Logar openModal={openModalLogar} closeModal={setOpenModalLogar} />
        </React.Fragment>
    );
}