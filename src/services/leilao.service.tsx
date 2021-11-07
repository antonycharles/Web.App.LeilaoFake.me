import ILeilaoPaginacao from "interfaces/leilao.paginacao";
import ILeilao from "interfaces/leilao";
import ILeilaoIncluir from "interfaces/leilao.incluir";
import IApiService from "./api.service.interface";
import ILeilaoService from "./leilao.service.interface";

export default class LeilaoService implements ILeilaoService {

    constructor(
        private api : IApiService
    ){}

    public async getLeiloes(dados: ILeilaoPaginacao): Promise<ILeilaoPaginacao> {

        const request = {
            pagina: dados.pagina,
            porPagina: dados.porPagina,
            order: dados.order,
            meusLeiloes: dados.meusLeiloes,
            search: dados.search
        }
    
        try {
            const response = await this.api.getApi().get(`/Leilao`, { params: request, });
            const dados_1 = response.data as unknown as ILeilaoPaginacao;
            return dados_1;
        } catch (error) {
            return await Promise.reject(this.api.defaultErro(error));
        }
    }
    
    public async getLeilaoId(leilao_id: string): Promise<ILeilao> {
        try {
            const response = await this.api.getApi().get(`/leilao/${leilao_id}`);
            const dados = response.data as unknown as ILeilao;
            return dados;
        } catch (error) {
            return await Promise.reject(this.api.defaultErro(error));
        }
    }
    
    public async incluir(leilao : ILeilaoIncluir) : Promise<ILeilao> {
        try {
            const response = await this.api.getApi().post('/leilao', leilao);
            const dados = response.data as unknown as ILeilao;
            return dados;
        } catch (error) {
            return await Promise.reject(this.api.defaultErro(error));
        }
    }
    
    public async update(url:string, leilao : ILeilaoIncluir) : Promise<string>{
        try {
            await this.api.getApi().put(url, leilao);
            return 'Leilão alterado com sucesso!';
        } catch (error) {
            return await Promise.reject(this.api.defaultErro(error));
        }
    }
    
    public async executaPatch(url:string, mensagemSucesso:string) : Promise<string> {
        try {
            await this.api.getApi().patch(url);
            return mensagemSucesso;
        } catch (error) {
            return await Promise.reject(this.api.defaultErro(error));
        }
    }
    
    public async deletar(url:string) : Promise<string> {
        try {
            await this.api.getApi().delete(url);
            return 'Leilão deletado com sucesso!';
        } catch (error) {
            return await Promise.reject(this.api.defaultErro(error));
        }
    }
};

