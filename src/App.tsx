import React from 'react';
import AutenticadoContext from "./contexts/AutenticadoContext"
import { autenticadoModel } from "./models/autenticado.model"
import { leiloesPaginacaoModel } from "./models/leiloes.paginacao.model";
import LeiloesPaginacaoContext from './contexts/LeiloesPaginacaoContext';
import AppHeader from './components/AppHeader';
import AppRoute from './AppRoute';
import { SnackbarProvider } from 'notistack';

function App() {
  const [autenticado, setAuthenticated] = React.useState(autenticadoModel.userAutenticado());
  const [leiloesPaginacao, setLeiloesPaginacao] = React.useState(leiloesPaginacaoModel.defaultValue())


  return (
    <SnackbarProvider maxSnack={3}>
      <AutenticadoContext.Provider value={{ autenticado: autenticadoModel.userAutenticado(), setAuthenticated }}>
        <LeiloesPaginacaoContext.Provider value={{ dados: leiloesPaginacao, setDados: setLeiloesPaginacao }}>
          <AppHeader />
          <AppRoute />
        </LeiloesPaginacaoContext.Provider>
      </AutenticadoContext.Provider>
    s</SnackbarProvider>
  );
}

export default App;
