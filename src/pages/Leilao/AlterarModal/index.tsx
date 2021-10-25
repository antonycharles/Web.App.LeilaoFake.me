import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { leilaoService } from 'services/leilao.service'
import IErroDefault from 'interfaces/erro.default';
import ILeilao from 'interfaces/leilao';
import LeiloesPaginacaoContext from 'contexts/LeiloesPaginacaoContext';
import { leiloesPaginacaoModel } from 'models/leiloes.paginacao.model';
import LeilaoForm from 'components/LeilaoForm';
import ILeilaoIncluir from 'interfaces/leilao.incluir';
import ILink from 'interfaces/link';

function LeilaoAlterarModal() {
    const [leilao, setLeilao] = React.useState({} as ILeilao);
    const [erroMessage, setErroMessage] = React.useState({} as IErroDefault)
    
    let { leilao_id } = useParams<{ leilao_id: string }>();

    const leiloesPaginacaoContext = React.useContext(LeiloesPaginacaoContext);

    let history = useHistory();

    useEffect(() => {
        leilaoService.getLeilaoId(leilao_id)
            .then((dados: ILeilao) => {
                if (leilao?.id !== leilao_id)
                    setLeilao(dados)
            }).catch((erros: IErroDefault) => {
                history.push('/404');
            });
    }, [leilao_id]);

    const handleClose = (event: React.FormEvent<EventTarget>) => {
        event.stopPropagation();
        history.goBack();
    };

    const getUrlAlterar = () : ILink => {
        return leilao.links.find(x => x.rel === 'update') as ILink;
    }

    const handleSubmit = (leilaoAlterar : ILeilaoIncluir) => {
        const link = getUrlAlterar();

        leilaoService.update(link.href,leilaoAlterar)
            .then((resultado: string) => {
                setErroMessage({} as IErroDefault)
                leiloesPaginacaoContext.setDados(leiloesPaginacaoModel.refrash(leiloesPaginacaoContext.dados))
                history.push('/?meus_leiloes=true');
            })
            .catch((erros: IErroDefault) => {
                setErroMessage(erros)
            })
    }

    return (
        <div>
            <Dialog open={true} onClose={handleClose} fullWidth={true} maxWidth="md">
                <DialogTitle>Alterar leilão</DialogTitle>
                <DialogContent
                    sx={{
                        '& .MuiTextField-root': { mt: '20px' },
                    }}>
                    <LeilaoForm
                        btnSubmitTexto="Alterar"
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

export default LeilaoAlterarModal;