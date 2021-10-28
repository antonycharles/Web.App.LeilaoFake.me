import ILanceIncluir from "../interfaces/lance.incluir";
import ILance from "../interfaces/lance";
import { baseService } from "./base.service";

export const leilaoLanceService = {
    incluir
}

function incluir(url:string, lance:ILanceIncluir) : Promise<ILance> {
    return baseService.getApi().post(url,lance)
    .then(response => {
        return response.data as unknown as ILance;
    })
    .then((dados : ILance) => {
        return dados;
    })
    .catch(error => {
        return Promise.reject(baseService.defaultErro(error));
    });
}