import { ILance } from "./lance.js";
import { ILink } from "./link.js";
import { IUsuario } from "./usuario.js";

export interface ILeilao {
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
    links: Array<ILink>
}