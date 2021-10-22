import ILance from "./lance";
import ILink  from "./link";
import IUsuario  from "./usuario";
import ILeilaoImagem from "./leilao.imagem"

export default interface ILeilao {
    id: string,
    leiloadoPorId: string,
    leiloadoPOr: IUsuario,
    isPublico: boolean,
    criadoEm: Date,
    alteradoEm: Date,
    totalLance: number,
    titulo: string,
    descricao: string,
    lanceMinimo: number,
    dataInicio: Date,
    dataFim: Date,
    lances: Array<ILance>,
    lanceGanhadorId: string,
    lanceGanhador: ILance,
    status: string,
    links: Array<ILink>,
    leilaoImagens: Array<ILeilaoImagem>,
    linkCaminhoImagem: string
}