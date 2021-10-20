import IUsuarioLogado from "../interfaces/usuario.logado";
import { baseService } from "./base.service";

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

    var request = {
        "email": email,
        "nome": nome
    };


    return baseService.getApi().post(`/Login/cadastro`,request)
        .then(response => {
            return response.data as unknown as IUsuarioLogado;
        })
        .then((dados: IUsuarioLogado) => {
            return dados;
        })
        .catch(error => {
            return Promise.reject(baseService.defaultErro(error));
        });
}