import ILink  from "./link";

export default interface ILeilaoImagem {
    id: number,
    leilaoId:string,
    url:string,
    links: Array<ILink>
}