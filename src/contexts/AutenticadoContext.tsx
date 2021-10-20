import { createContext } from "react";
import IUsuarioLogado from "interfaces/usuario.logado";
import { autenticadoModel } from "models/autenticado.model"

const AutenticadoContext = createContext({
    autenticado: autenticadoModel.userAutenticado(),
    setAuthenticated: (dados:IUsuarioLogado) => {}
});

export default AutenticadoContext;