import ILeilaoImagem from "../interfaces/leilao.imagem"
import IApiService from "./api.service.interface";
import ILeilaoImagemService from "./leilao.imagem.service.interface";

export default class LeilaoImagemService implements ILeilaoImagemService{

    constructor(
        private api : IApiService
    ){}

    public async incluir(url:string, leilaoId:string, arquivo:File): Promise<ILeilaoImagem> {
        var formData = new FormData();
    
        formData.append("leilaoId", leilaoId);
        formData.append("imagem", arquivo);
    
        try {
            const response = await this.api.getApi().post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const dados = response.data as unknown as ILeilaoImagem;
            return dados;
        } catch (error) {
            return await Promise.reject(this.api.defaultErro(error));
        }
    }
    
    public async deletar(url:string) : Promise<string> {
        try {
            await this.api.getApi().delete(url);
            return 'Imagem leilão deletado com sucesso!';
        } catch (error) {
            return await Promise.reject(this.api.defaultErro(error));
        }
    }
}

