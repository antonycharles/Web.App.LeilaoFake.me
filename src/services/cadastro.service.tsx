import IUsuarioLogado from "../interfaces/usuario.logado";
import IApiService from "./api.service.interface";
import ICadastroService from "./cadastro.service.interface";

export default class CadastroService implements ICadastroService {

    constructor(
        private api : IApiService
    ){}


    public async cadastrar(nome: string, email :string) : Promise<IUsuarioLogado> {
        const dados = await this.inscrevaseServidor(nome, email);
        return dados;
    }
    
    private async inscrevaseServidor(nome: string, email: string) : Promise<IUsuarioLogado> {
    
        var request = {
            "email": email,
            "nome": nome
        };
    
    
        try {
            const response = await this.api.getApi().post(`/signup`, request);
            const dados = response.data as unknown as IUsuarioLogado;
            return dados;
        } catch (error) {
            return await Promise.reject(this.api.defaultErro(error));
        }
    }
}


