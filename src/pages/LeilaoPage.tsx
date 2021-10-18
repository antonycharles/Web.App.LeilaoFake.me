import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import AppMenu from "../components/AppMenu";
import LeilaoShow from "../components/LeilaoShow";
import { IErroDefault } from "../interfaces/erro.default";
import { ILeilao } from "../interfaces/leilao";
import { leiloesService } from "../services/leilao.service";

function LeilaoPage() {
    const [leilao, setLeilao] = React.useState<ILeilao | undefined>(undefined)
    let history = useHistory();
    let { leilao_id } = useParams<{ leilao_id: string }>();

    useEffect(() => {
        leiloesService.getLeilaoId(leilao_id)
            .then((dados: ILeilao) => {
                if (leilao?.id !== leilao_id)
                    setLeilao(dados)
            }).catch((erros: IErroDefault) => {
                console.log(erros);
            });
    });

    return (
        <Container sx={{ mt: '20px' }}>
            <LeilaoShow leilao={leilao} />
        </Container>
    )
}

export default LeilaoPage;