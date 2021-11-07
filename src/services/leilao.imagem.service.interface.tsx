import ILeilaoImagem from "../interfaces/leilao.imagem"

export default interface ILeilaoImagemService {
    incluir(url:string, leilaoId:string, arquivo:File): Promise<ILeilaoImagem>,
    deletar(url:string) : Promise<string>
}