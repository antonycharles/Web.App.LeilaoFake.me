import { ILeilaoPaginacao } from "../interfaces/leilao.paginacao.js";
import dados  from "../dados.json"
import { ILeilao } from "../interfaces/leilao.js";
import { logarService } from "./logar.service.js";

export class LeilaoService{

    public getLeiloesPublicos() : Promise<ILeilaoPaginacao> {
        return fetch(`${dados.api_url}/Leilao`,{
            method: 'GET'
        })
        .then(res => {
            return res.json();
        })
        .then((dados: ILeilaoPaginacao) => {
            return dados;
        });
    }

    public async getMeusLeiloes() : Promise<ILeilaoPaginacao> {
        /*
        const usuarioLogado = await this.loginService.userLogado();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + usuarioLogado.accessToken)

        return fetch(`${dados.api_url}/leilao/meus-leiloes`, {
            method: 'GET',
            headers: myHeaders
        })
        .then(res => {
            return res.json();
        })
        .then((dados: ILeilaoPaginacao) => {
            return dados;
        });
        */
       return Promise.reject()
    }

    public getLeilaoId(leilaoId: string) : Promise<ILeilao> {
        return fetch(`${dados.api_url}/leilao/${leilaoId}`, {
            method: 'GET'
        })
        .then(res => {
            return res.json();
        })
        .then((dados: ILeilao) => {
            return dados;
        })
    }
}