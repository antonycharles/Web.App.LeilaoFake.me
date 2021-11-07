import IErroDefault from "interfaces/erro.default";
import dados from "../dados.json"
import axios, { AxiosInstance } from "axios";
import IApiService from "./api.service.interface";
import IUsuarioLogado from "interfaces/usuario.logado";

export default class ApiService implements IApiService {
    constructor(
        private autenticado : IUsuarioLogado
    ){}

    public getApi(): AxiosInstance {
        let api = axios.create({
            baseURL: dados.api_url
        });
    
    
        if (this.autenticado.authenticated)
            api.defaults.headers.common = { 'Authorization': `bearer ${this.autenticado.accessToken}` };
    
        return api;
    }
    
    public defaultErro(error: any): IErroDefault {
    
        if (error.response.data !== "") {
            return {
                code: error.response.data.code,
                message: error.response.data.message,
                details: error.response.data.details,
                innerError: error.response.data.innerError
            }
        }
    
        let mensagem = error.response.status + ' - ' + error.response.statusText;
    
        return {message:mensagem}
    }
}

