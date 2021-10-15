import { ILeilao } from "./leilao.js";
import { ILink } from "./link.js";

export interface ILeilaoPaginacao {
    search: string,
    pagina: number,
    total: number,
    porPagina: number,
    order: string,
    meusLeiloes: boolean,
    resultados : Array<ILeilao>,
    links : Array<ILink>
}
