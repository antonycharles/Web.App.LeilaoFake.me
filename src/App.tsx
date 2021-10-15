import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from "./components/AppHeader"
import AppMenu from "./components/AppMenu"
import AppBody from "./components/AppBody"
import AutenticadoContext from "./contexts/AutenticadoContext"
import LeiloesPaginacaoContext from "./contexts/LeiloesPaginacaoContext"
import { autenticadoModel } from "./models/autenticado.model"
import { leiloesPaginacaoModel } from "./models/leiloes.paginacao.model"

function App() {
  const [autenticado, setAuthenticated] = React.useState(autenticadoModel.userAutenticado());
  const [leiloesPaginacao, setLeiloesPaginacao] = React.useState(leiloesPaginacaoModel.defaultValue())

  return (
    <AutenticadoContext.Provider value={{ autenticado: autenticadoModel.userAutenticado(), setAuthenticated }}>
      <LeiloesPaginacaoContext.Provider value={{ dados: leiloesPaginacao, setDados: setLeiloesPaginacao }}>
        <AppHeader />
        <AppMenu />
        <AppBody />
      </LeiloesPaginacaoContext.Provider>
    </AutenticadoContext.Provider>
  );
}

export default App;
