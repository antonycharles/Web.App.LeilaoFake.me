import IUsuarioLogado from "../interfaces/usuario.logado";

export default interface ICadastroService {
    cadastrar(nome: string, email :string) : Promise<IUsuarioLogado>
}