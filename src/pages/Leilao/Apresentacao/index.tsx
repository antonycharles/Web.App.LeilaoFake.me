import React, { useEffect } from "react";
import { Button, Container, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { leilaoService } from "services/leilao.service";
import { leilaoLanceService } from "services/leilao.lance.service";
import ILeilao from "interfaces/leilao";
import IErroDefault from "interfaces/erro.default";
import LeilaoShow from "components/LeilaoShow";
import LanceForm from "components/LanceForm";
import LeilaoShowStack from "components/LeilaoShowStack";
import { leiloesPaginacaoModel } from "models/leiloes.paginacao.model";
import { useSnackbar } from 'notistack';
import ILink from "interfaces/link";
import ILance from "interfaces/lance";
import LeiloesPaginacaoContext from "contexts/LeiloesPaginacaoContext";

function Apresentacao(props: { isModal: boolean }) {
    const [leilao, setLeilao] = React.useState<ILeilao>()
    const [erroMessageLance, setErroMessageLance] = React.useState({} as IErroDefault)

    let history = useHistory();
    let { leilao_id } = useParams<{ leilao_id: string }>();
    
    const leiloesPaginacaoContext = React.useContext(LeiloesPaginacaoContext);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        leilaoService.getLeilaoId(leilao_id)
            .then((dados: ILeilao) => {
                if (leilao === undefined)
                    setLeilao(dados)
            }).catch((erros: IErroDefault) => {
                history.push('/404');
            });
    }, [leilao_id]);

    const handleClose = (event: React.FormEvent<EventTarget>) => {
        event.stopPropagation();
        history.goBack();
    };

    const handleButtonDeleteclick = (url: string) => {
        leilaoService.deletar(url)
            .then(response => {
                enqueueSnackbar(response, { variant: "success" });
                leiloesPaginacaoContext.setDados(leiloesPaginacaoModel.meusLeiloes())
                history.push('/meus-leiloes')
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
                setLeilao({ ...leilao, id: "" } as ILeilao);
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

    const handleSubmitLance = (valor: number) => {
        const link = leilao?.links.find(x => x.rel === "add_lance") as ILink;
        leilaoLanceService.incluir(link.href, { leilaoId: leilao?.id as string, valor: valor })
            .then((resultado: ILance) => {
                setErroMessageLance({} as IErroDefault)
                history.go(0);
            })
            .catch((erros: IErroDefault) => {
                setErroMessageLance(erros)
            })
    }

    const lanceForm = () : JSX.Element => {
        const link = leilao?.links.find(x => x.rel === "add_lance") as ILink;
        if (link !== undefined) {
            return (
                <LanceForm
                    btnSubmit={handleSubmitLance}
                    errosMensage={erroMessageLance}
                    setErrosMensage={setErroMessageLance}
                />
            );
        }

        return(<></>);
    }

    return (
        <>
            {props.isModal ?
                <Dialog open={true} onClose={handleClose} fullWidth={true} maxWidth="lg">
                    <DialogContent>
                        <LeilaoShow
                            leilao={leilao as ILeilao}
                            leilaoShowStack={
                                <LeilaoShowStack
                                    leilao={leilao as ILeilao}
                                    clickButtonDeletarLeilao={handleButtonDeleteclick}
                                    clickButtonExecutaPatch={handleButtonPatchClick}
                                />
                            }
                            lanceForm={lanceForm()}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="error">Sair</Button>
                    </DialogActions>
                </Dialog>
                :
                <Container sx={{ mt: '20px' }}>
                    <LeilaoShow
                        leilao={leilao as ILeilao}
                        leilaoShowStack={
                            <LeilaoShowStack
                                leilao={leilao as ILeilao}
                                clickButtonDeletarLeilao={handleButtonDeleteclick}
                                clickButtonExecutaPatch={handleButtonPatchClick}
                            />
                        }
                        lanceForm={lanceForm()}
                    />
                </Container>
            }
        </>
    );
}

export default Apresentacao;