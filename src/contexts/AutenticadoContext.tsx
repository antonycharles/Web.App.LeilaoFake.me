import { createContext } from "react";
import IUsuarioLogado from "interfaces/usuario.logado";

const AutenticadoContext = createContext({
    autenticado: {} as IUsuarioLogado,
    setAuthenticated: (dados:IUsuarioLogado) => {}
});

export default AutenticadoContext;