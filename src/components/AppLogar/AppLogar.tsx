import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { logarService } from '../../services/logar.service'
import { IErroDefault } from '../../interfaces/erro.default';
import AutenticadoContext from '../../contexts/AutenticadoContext';
import { IUsuarioLogado } from '../../interfaces/usuario.logado';
import AppFormErro from '../AppFormErro';

export default function AppLogar(props: { openModal: boolean, closeModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [email, setEmail] = React.useState("");
    const [erroMessage, setErroMessage] = React.useState({})

    const autenticacaoContext = React.useContext(AutenticadoContext);

    const handleClose = () => {
        setEmail("");
        setErroMessage({})
        props.closeModal(false);
    };

    const handleSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();

        logarService.logar(email)
            .then((resultado: IUsuarioLogado) => {
                setEmail("");
                setErroMessage({})
                handleClose()
                autenticacaoContext.setAuthenticated(resultado);
            })
            .catch((erros : IErroDefault) => {
                setErroMessage(erros)
            })
    }

    return (
        <div>
            <Dialog open={props.openModal} onClose={handleClose} fullWidth={true} maxWidth="sm">
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Entrar</DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{ mb: "20px" }}>
                            Informe seu e-mail cadastrado:
                        </DialogContentText>
                        <AppFormErro erro={erroMessage} />
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
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="error">Sair</Button>
                        <Button type="submit" color="success">Logar</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
