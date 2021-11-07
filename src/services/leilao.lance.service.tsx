import ILanceIncluir from "../interfaces/lance.incluir";
import ILance from "../interfaces/lance";
import IApiService from "./api.service.interface";
import ILeilaoLanceService from "./leilao.lance.service.interface"

export default class LeilaoLanceService implements ILeilaoLanceService {
    constructor(
        private api : IApiService
    ){}

    public async incluir(url:string, lance:ILanceIncluir) : Promise<ILance> {
        try {
            const response = await this.api.getApi().post(url, lance);
            const dados = response.data as unknown as ILance;
            return dados;
        } catch (error) {
            return await Promise.reject(this.api.defaultErro(error));
        }
    }
}

