import { baseService } from "./base.service";
import ILeilaoImagem from "../interfaces/leilao.imagem"

export const leilaoImagemService = {
    incluir,
    deletar
}

function incluir(url:string, leilaoId:string, arquivo:File): Promise<ILeilaoImagem> {
    var formData = new FormData();

    formData.append("leilaoId", leilaoId);
    formData.append("imagem", arquivo);

    return baseService.getApi().post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {
        return response.data as unknown as ILeilaoImagem;
    })
    .then((dados : ILeilaoImagem) => {
        return dados;
    })
    .catch(error => {
        return Promise.reject(baseService.defaultErro(error));
    });
}

function deletar(url:string) : Promise<string> {
    return baseService.getApi().delete(url)
    .then(response => {
        return 'Imagem leilão deletado com sucesso!';
    })
    .catch(error => {
        return Promise.reject(baseService.defaultErro(error));
    });
}