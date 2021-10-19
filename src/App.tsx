import React from 'react';
import './App.css';
import AppMenu from "./components/AppMenu"
import HomePage from "./pages/Home.Page";
import LeilaoModalPage from "./pages/Leilao.Modal";
import AutenticadoContext from "./contexts/AutenticadoContext"
import { autenticadoModel } from "./models/autenticado.model"
import { leiloesPaginacaoModel } from "./models/leiloes.paginacao.model";
import { Location } from "history";
import { Route, Switch, useLocation } from "react-router-dom";
import LeiloesPaginacaoContext from './contexts/LeiloesPaginacaoContext';
import LeilaoPage from './pages/Leilao.Page';
import LoginModal from './pages/Login.Modal';
import AppHeader from './components/AppHeader';
import CadastroModal from './pages/Cadastro.Modal';
import LeilaoIncluirModal from './pages/Leilao.Incluir.Modal';

function App() {
  const [autenticado, setAuthenticated] = React.useState(autenticadoModel.userAutenticado());
  const [leiloesPaginacao, setLeiloesPaginacao] = React.useState(leiloesPaginacaoModel.defaultValue())

  let location = useLocation<{ background?: Location<{} | null | undefined> }>();

  let background = location.state && location.state.background;

  return (
    <AutenticadoContext.Provider value={{ autenticado: autenticadoModel.userAutenticado(), setAuthenticated }}>
      <LeiloesPaginacaoContext.Provider value={{ dados: leiloesPaginacao, setDados: setLeiloesPaginacao }}>
        <AppHeader />
        <Switch location={background || location}>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/leilao/:leilao_id">
            <LeilaoPage />
          </Route>
        </Switch>

        {background &&
          <Switch location={location}>
            <Route exact path="/leilao/:leilao_id">
              <LeilaoModalPage />
            </Route>
            <Route exact path="/leilao-incluir">
              <LeilaoIncluirModal />
            </Route>
            <Route exact path="/login">
              <LoginModal />
            </Route>
            <Route exact path="/cadastro">
              <CadastroModal />
            </Route>
          </Switch>
        }
      </LeiloesPaginacaoContext.Provider>
    </AutenticadoContext.Provider>
  );
}

export default App;
