import React from 'react';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { IErroDefault } from '../../interfaces/erro.default';
import { cadastroService } from '../../services/cadastro.service';
import AutenticadoContext from '../../contexts/AutenticadoContext';
import { IUsuarioLogado } from '../../interfaces/usuario.logado';
import AppFormErro from '../AppFormErro';

export default function AppCadastro(props: { openModal: boolean, closeModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [nome, setNome] = React.useState("");
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

        cadastroService.cadastrar(nome, email)
            .then((resultado: IUsuarioLogado) => {
                setEmail("");
                setErroMessage({})
                handleClose()
                autenticacaoContext.setAuthenticated(resultado);
            })
            .catch((erros: IErroDefault) => {
                setErroMessage(erros)
            })
    }

    return (
        <div>
            <Dialog open={props.openModal} onClose={handleClose} fullWidth={true} maxWidth="sm" sx={{ mt: '-33%'}} >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Cadastro</DialogTitle>
                    <DialogContent
                        sx={{
                            '& .MuiTextField-root': { mb: '20px' },
                        }}
                    >
                        <DialogContentText sx={{ mb: "20px" }}>
                            Informe nome e e-mail para se cadastrar:
                        </DialogContentText>
                        <AppFormErro erro={erroMessage} />
                        <TextField
                            autoFocus
                            id="nome"
                            name="nome"
                            label="nome"
                            type="nome"
                            value={nome}
                            onChange={event => setNome(event.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
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
                        <Button type="submit" color="success">Cadastrar</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}