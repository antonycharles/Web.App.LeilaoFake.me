import * as React from 'react';
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useHistory } from "react-router-dom";
import { leilaoService } from 'services/leilao.service'
import IErroDefault from 'interfaces/erro.default';
import ILeilao from 'interfaces/leilao';
import LeiloesPaginacaoContext from 'contexts/LeiloesPaginacaoContext';
import { leiloesPaginacaoModel } from 'models/leiloes.paginacao.model';
import LeilaoForm from 'components/LeilaoForm';
import ILeilaoIncluir from 'interfaces/leilao.incluir';

function LeilaoIncluirModal() {
    const [leilao, setLeilao] = React.useState({} as ILeilao);
    const [erroMessage, setErroMessage] = React.useState({} as IErroDefault)

    const leiloesPaginacaoContext = React.useContext(LeiloesPaginacaoContext);

    let history = useHistory();

    const handleClose = (event: React.FormEvent<EventTarget>) => {
        event.stopPropagation();
        history.goBack();
    };

    const handleSubmit = (leilaoIncluir : ILeilaoIncluir) => {
        setLeilao({ ...leilao, ...leilaoIncluir } as unknown as ILeilao)
        leilaoService.incluir(leilaoIncluir)
            .then((resultado: ILeilao) => {
                setErroMessage({} as IErroDefault)
                leiloesPaginacaoContext.setDados(leiloesPaginacaoModel.meusLeiloes())
                history.push('/meus-leiloes');
            })
            .catch((erros: IErroDefault) => {
                setErroMessage(erros)
            })
    }

    return (
        <div>
            <Dialog open={true} onClose={handleClose} fullWidth={true} maxWidth="md">
                <DialogTitle>Novo leilão</DialogTitle>
                <DialogContent
                    sx={{
                        '& .MuiTextField-root': { mt: '20px' },
                    }}>
                    <LeilaoForm
                        btnSubmitTexto="Incluir"
                        btnSubmit={handleSubmit}
                        btnSair={handleClose}
                        errosMensage={erroMessage}
                        setErrosMensage={setErroMessage}
                        leilao={leilao} />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default LeilaoIncluirModal;