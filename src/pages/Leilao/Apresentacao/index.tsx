import React, { useEffect } from "react";
import { Button, Container, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { leilaoService } from "services/leilao.service";
import ILeilao from "interfaces/leilao";
import IErroDefault from "interfaces/erro.default";
import LeilaoShow from "components/LeilaoShow";
import { leiloesPaginacaoModel } from "models/leiloes.paginacao.model";
import LeiloesPaginacaoContext from "contexts/LeiloesPaginacaoContext";
import { useSnackbar } from 'notistack';

function Apresentacao(props: { isModal: boolean }) {
    const [leilao, setLeilao] = React.useState<ILeilao>()
    let history = useHistory();
    let { leilao_id } = useParams<{ leilao_id: string }>();

    const { enqueueSnackbar } = useSnackbar();

    const leiloesPaginacaoContext = React.useContext(LeiloesPaginacaoContext);

    useEffect(() => {
        leilaoService.getLeilaoId(leilao_id)
            .then((dados: ILeilao) => {
                if (leilao?.id !== leilao_id)
                    setLeilao(dados)
            }).catch((erros: IErroDefault) => {
                history.push('/404');
            });
    }, [leilao, leilao_id]);

    const handleClose = (event: any) => {
        event.stopPropagation();
        history.goBack();
    };

    const handleButtonDeleteclick = (url: string) => {
        leilaoService.deletar(url)
            .then(response => {
                enqueueSnackbar(response, { variant: "success" });
                leiloesPaginacaoContext.setDados(leiloesPaginacaoModel.meusLeiloes())
                history.go(-1);
            })
            .catch((erro: IErroDefault) => {
                enqueueSnackbar(erro.message, {
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    }, variant: "error"
                });
            });
    }

    const handleButtonPatchClick = (url: string, mensagem: string) => {
        leilaoService.executaPatch(url, mensagem)
            .then(response => {
                enqueueSnackbar(response, { variant: "success" });
                setLeilao({...leilao,id:""} as ILeilao);
            })
            .catch((erro: IErroDefault) => {
                enqueueSnackbar(erro.message, {
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    }, variant: "error"
                });
            });
    }

    return (
        <>
            {props.isModal ?
                <Dialog open={true} onClose={handleClose} fullWidth={true} maxWidth="lg">
                    <DialogContent>
                        <LeilaoShow
                            leilao={leilao as ILeilao}
                            clickButtonDeletarLeilao={handleButtonDeleteclick}
                            clickButtonExecutaPatch={handleButtonPatchClick} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="error">Sair</Button>
                    </DialogActions>
                </Dialog>
                :
                <Container sx={{ mt: '20px' }}>
                    <LeilaoShow
                        leilao={leilao as ILeilao}
                        clickButtonDeletarLeilao={handleButtonDeleteclick}
                        clickButtonExecutaPatch={handleButtonPatchClick} />
                </Container>
            }
        </>
    );
}

export default Apresentacao;