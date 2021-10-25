import ILeilao from "./leilao";
import ILink from "./link";

export default interface ILeilaoPaginacao {
    search: string,
    pagina: number,
    total: number,
    porPagina: number,
    order: string,
    meusLeiloes: boolean,
    resultados : Array<ILeilao>,
    links : Array<ILink>,
    refrash?:boolean
}
