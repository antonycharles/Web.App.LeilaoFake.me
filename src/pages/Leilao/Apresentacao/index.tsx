import React, { useEffect } from "react";
import { Button, Container, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { leilaoService } from "services/leilao.service";
import ILeilao from "interfaces/leilao";
import IErroDefault from "interfaces/erro.default";
import LeilaoShow from "components/LeilaoShow";

function Apresentacao(props: { isModal: boolean }) {
    const [leilao, setLeilao] = React.useState<ILeilao>()
    let history = useHistory();
    let { leilao_id } = useParams<{ leilao_id: string }>();

    useEffect(() => {
        leilaoService.getLeilaoId(leilao_id)
            .then((dados: ILeilao) => {
                if (leilao?.id !== leilao_id)
                    setLeilao(dados)
            }).catch((erros: IErroDefault) => {
                console.log(erros);
            });
    }, [leilao,leilao_id]);

    const handleClose = (event: any) => {
        event.stopPropagation();
        history.goBack();
    };

    return (
        <>
            {props.isModal ?
                <Dialog open={true} onClose={handleClose} fullWidth={true} maxWidth="lg">
                    <DialogContent>
                        <LeilaoShow leilao={leilao as ILeilao} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="error">Sair</Button>
                    </DialogActions>
                </Dialog>
                :
                <Container sx={{ mt: '20px' }}>
                    <LeilaoShow leilao={leilao as ILeilao} />
                </Container>
            }
        </>
    );
}

export default Apresentacao;