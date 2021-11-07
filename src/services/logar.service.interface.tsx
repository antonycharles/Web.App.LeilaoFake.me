import IUsuarioLogado from "../interfaces/usuario.logado";

export default interface ILogarService {
    logar(email: string): Promise<IUsuarioLogado>,

}