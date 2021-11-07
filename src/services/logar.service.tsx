import IUsuarioLogado from "../interfaces/usuario.logado";
import IApiService from "./api.service.interface";
import ILogarService from "./logar.service.interface";

export default class LogarService implements ILogarService {

    constructor(
        private api : IApiService
    ){}

    public async logar(email: string): Promise<IUsuarioLogado> {

        const dados = await this.autenticacaoServidor(email);
        return dados;
    }
    
    private async autenticacaoServidor(email: string): Promise<IUsuarioLogado> {
        try {
            const response = await this.api.getApi().post(`/Login`, {
                "email": email
            });
            const dados = response.data as unknown as IUsuarioLogado;
            return dados;
        } catch (error) {
            return await Promise.reject(this.api.defaultErro(error));
        }
    }
}

