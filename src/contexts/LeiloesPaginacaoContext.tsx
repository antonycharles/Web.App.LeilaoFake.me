import { createContext } from "react";
import ILeilaoPaginacao from "interfaces/leilao.paginacao";
import { leiloesPaginacaoModel } from "models/leiloes.paginacao.model";

const LeiloesPaginacaoContext = createContext({
    dados: leiloesPaginacaoModel.defaultValue(),
    setDados: (dados:ILeilaoPaginacao) => {}
});

export default LeiloesPaginacaoContext;