import React from 'react';
import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import IErroDefault from 'interfaces/erro.default';
import { cadastroService } from 'services/cadastro.service';
import AutenticadoContext from 'contexts/AutenticadoContext';
import IUsuarioLogado from 'interfaces/usuario.logado';
import AppFormErro from 'components/AppFormErro';
import { useHistory } from 'react-router-dom';

function CadastroModal() {
    let history = useHistory();

    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [erroMessage, setErroMessage] = React.useState({})

    const autenticacaoContext = React.useContext(AutenticadoContext);

    const handleClose = (event:  React.FormEvent<EventTarget>) => {
        event.stopPropagation();
        history.goBack();
    };

    const handleSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();

        cadastroService.cadastrar(nome, email)
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
                    <DialogTitle>Cadastro</DialogTitle>
                    <DialogContent
                        sx={{
                            '& .MuiTextField-root': { mb: '20px' },
                        }}
                    >
                        <DialogContentText sx={{ mb: "20px" }}>
                            Informe nome e e-mail para se cadastrar:
                        </DialogContentText>
                        <AppFormErro erro={erroMessage as IErroDefault} />
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
                        <Box sx={{ textAlign: 'end' }}>
                            <Button onClick={handleClose} color="error">Sair</Button>
                            <Button type="submit" color="success" variant="contained">Cadastrar</Button>
                        </Box>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    );
}

export default CadastroModal;