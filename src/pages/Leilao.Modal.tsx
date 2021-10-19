import React, { useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { leiloesService } from "../services/leilao.service";
import { ILeilao } from "../interfaces/leilao";
import { IErroDefault } from "../interfaces/erro.default";
import LeilaoShow from "../components/LeilaoShow";

function LeilaoModal() {
    const [leilao, setLeilao] = React.useState<ILeilao | undefined>(undefined)
    let history = useHistory();
    let { leilao_id } = useParams<{ leilao_id: string }>();

    useEffect(() => {
        leiloesService.getLeilaoId(leilao_id)
            .then((dados: ILeilao) => {
                if(leilao?.id !== leilao_id)
                    setLeilao(dados)
            }).catch((erros: IErroDefault) => {
                console.log(erros);
            });
    });

    const handleClose = (event: any) => {
        event.stopPropagation();
        history.goBack();
    };

    return (
        <div>
            <Dialog open={true} onClose={handleClose} fullWidth={true} maxWidth="lg">
                <DialogContent>
                    <LeilaoShow leilao={leilao} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">Sair</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default LeilaoModal;