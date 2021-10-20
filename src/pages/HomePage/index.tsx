import LeilaoList from "components/LeilaoList";
import LeilaoProximaPagina from "components/LeilaoProximaPagina";
import LeiloesPaginacaoContext from "contexts/LeiloesPaginacaoContext";
import IErroDefault from "interfaces/erro.default";
import ILeilaoPaginacao from "interfaces/leilao.paginacao";
import React, { useEffect } from "react";
import { leilaoService } from "services/leilao.service";

function HomePage() {
    const leiloesPaginacaoContext = React.useContext(LeiloesPaginacaoContext);

    useEffect(() => {
        leilaoService.getLeiloes(leiloesPaginacaoContext.dados)
            .then((dados: ILeilaoPaginacao) => {
                if (leiloesPaginacaoContext.dados.total === 0 && dados.resultados.length > 0)
                    leiloesPaginacaoContext.setDados(dados);
            }).catch((erros:IErroDefault) => {
                console.log(erros);
            });
    },[leiloesPaginacaoContext]);

    return (
        <>
            <LeilaoList />
            <LeilaoProximaPagina />
        </>
    );
}

export default HomePage;