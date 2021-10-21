import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { logarService } from 'services/logar.service'
import IErroDefault from 'interfaces/erro.default';
import AutenticadoContext from 'contexts/AutenticadoContext';
import IUsuarioLogado from 'interfaces/usuario.logado';
import AppFormErro from 'components/AppFormErro';
import { useHistory } from "react-router-dom";
import { Box } from '@mui/material';

function LoginModal() {
    const [email, setEmail] = React.useState("");
    const [erroMessage, setErroMessage] = React.useState({})

    let history = useHistory();

    const autenticacaoContext = React.useContext(AutenticadoContext);

    const handleClose = (event:  React.FormEvent<EventTarget>) => {
        event.stopPropagation();
        history.goBack();
    };

    const handleSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();
        event.stopPropagation();

        logarService.logar(email)
            .then((resultado: IUsuarioLogado) => {
                setEmail("");
                setErroMessage({})
                history.goBack();
                autenticacaoContext.setAuthenticated(resultado);
            })
            .catch((erros: IErroDefault) => {
                setErroMessage(erros)
            })
    }

    return (
        <div>
            <Dialog open={true} onClose={handleClose} fullWidth={true} maxWidth="sm">
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Entrar</DialogTitle>
                    <DialogContent
                        sx={{
                            '& .MuiTextField-root': { mb: '20px' },
                        }}>
                        <DialogContentText sx={{ mb: "20px" }}>
                            Informe seu e-mail cadastrado:
                        </DialogContentText>
                        <AppFormErro erro={erroMessage as IErroDefault} />
                        <TextField
                            autoFocus
                            id="email"
                            name="email"
                            label="email"
                            type="email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            fullWidth
                            required
                        />
                        <Box sx={{ textAlign: 'end' }}>
                            <Button onClick={handleClose} color="error">Sair</Button>
                            <Button type="submit" color="success" variant="contained">Logar</Button>
                        </Box>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    );
}

export default LoginModal;