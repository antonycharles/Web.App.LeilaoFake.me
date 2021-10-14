import dados  from "../dados.json"
import axios from "axios";
import { IErroDefault } from "../interfaces/erro.default";
import { IUsuarioLogado } from "../interfaces/usuario.logado";

export const cadastroService = {
    cadastrar
};


function cadastrar(nome: string, email :string) : Promise<IUsuarioLogado> {
    localStorage.setItem('user-info','');

    return inscrevaseServidor(nome, email)
            .then((dados : IUsuarioLogado) => {
                localStorage.setItem('user-info',JSON.stringify(dados));
                return dados;
            })
}

function inscrevaseServidor(nome: string, email: string) : Promise<IUsuarioLogado> {

    var raw = {
        "email": email,
        "nome": nome
    };


    return axios.post(`${dados.api_url}/Login/cadastro`,raw)
        .then(response => {
            return response.data as unknown as IUsuarioLogado;
        })
        .then((dados: IUsuarioLogado) => {
            return dados;
        })
        .catch(error => {
            return Promise.reject(getDadosErro(error));
        });
}

function getDadosErro(error : any) : IErroDefault
{
    return {
        code: error.response.data.code,
        message: error.response.data.message,
        details: error.response.data.details,
        innerError:error.response.data.innerError
    }
}