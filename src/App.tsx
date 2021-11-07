import React from 'react';
import AutenticadoContext from "./contexts/AutenticadoContext"
import { leiloesPaginacaoModel } from "./models/leiloes.paginacao.model";
import LeiloesPaginacaoContext from './contexts/LeiloesPaginacaoContext';
import ServicesContext from "./contexts/ServicesContext";
import AppHeader from './shared/AppHeader';
import AppFooter from './shared/AppFooter';
import AppRoute from './AppRoute';
import { SnackbarProvider } from 'notistack';
import LogarService from 'services/logar.service';
import ApiService from 'services/api.service';
import CadastroService from 'services/cadastro.service';
import LeilaoImagemService from 'services/leilao.imagem.service';
import LeilaoLanceService from 'services/leilao.lance.service';
import LeilaoService from 'services/leilao.service';

function App() {
  const [autenticado, setAuthenticated] = React.useState({
    authenticated: false,
    created: new Date(),
    expiration: new Date(),
    accessToken: "",
    message: "",
    usuario: {
      id: "",
      nome: "",
      email: ""
    }
  });
  const [leiloesPaginacao, setLeiloesPaginacao] = React.useState(leiloesPaginacaoModel.defaultValue())


  return (
    <SnackbarProvider maxSnack={3}>
      <AutenticadoContext.Provider value={{ autenticado: autenticado, setAuthenticated }}>
        <ServicesContext.Provider value={{
          logarService: new LogarService(new ApiService(autenticado)),
          cadastroService: new CadastroService(new ApiService(autenticado)),
          leilaoImagemService: new LeilaoImagemService(new ApiService(autenticado)),
          leilaoLanceService: new LeilaoLanceService(new ApiService(autenticado)),
          leilaoService: new LeilaoService(new ApiService(autenticado))
        }}>
          <LeiloesPaginacaoContext.Provider value={{ dados: leiloesPaginacao, setDados: setLeiloesPaginacao }}>
            <AppHeader />
            <div style={{ minHeight: '85vh' }}>
              <AppRoute />
            </div>
            <AppFooter />
          </LeiloesPaginacaoContext.Provider>
        </ServicesContext.Provider>
      </AutenticadoContext.Provider>
    </SnackbarProvider>
  );
}

export default App;
