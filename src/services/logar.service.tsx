import { IUsuarioLogado } from "../interfaces/usuario.logado";
import { baseService } from "./base.service";

export const logarService = {
    logar,
    sair
}

function logar(email: string): Promise<IUsuarioLogado> {
    localStorage.setItem('user-info', '');

    return autenticacaoServidor(email)
        .then((dados: IUsuarioLogado) => {
            localStorage.setItem('user-info', JSON.stringify(dados));
            return dados;
        })
}

function sair(): void {
    localStorage.setItem('user-info', '');
}



function autenticacaoServidor(email: string): Promise<IUsuarioLogado> {
    return baseService.getApi().post(`/Login`, {
        "email": email
    })
        .then(response => {
            return response.data as unknown as IUsuarioLogado;
        })
        .then((dados: IUsuarioLogado) => {
            return dados;
        })
        .catch(error => {
            console.log(error.response)
            return Promise.reject(baseService.defaultErro(error));
        });
}