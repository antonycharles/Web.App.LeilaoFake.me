import ILeilaoPaginacao from "interfaces/leilao.paginacao";
import ILeilao from "interfaces/leilao";
import ILeilaoIncluir from "interfaces/leilao.incluir";

export default interface ILeilaoService {
    getLeiloes(dados: ILeilaoPaginacao): Promise<ILeilaoPaginacao>,
    getLeilaoId(leilao_id: string): Promise<ILeilao>,
    incluir(leilao : ILeilaoIncluir) : Promise<ILeilao>,
    update(url:string, leilao : ILeilaoIncluir) : Promise<string>,
    executaPatch(url:string, mensagemSucesso:string) : Promise<string>,
    deletar(url:string) : Promise<string>
}