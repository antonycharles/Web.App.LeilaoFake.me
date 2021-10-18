import React from 'react';
import './App.css';
import AppMenu from "./components/AppMenu"
import HomePage from "./pages/HomePage";
import LeilaoModalPage from "./pages/LeilaoModalPage";
import AutenticadoContext from "./contexts/AutenticadoContext"
import { autenticadoModel } from "./models/autenticado.model"
import { leiloesPaginacaoModel } from "./models/leiloes.paginacao.model";
import { Location } from "history";
import { Route, Switch, useLocation } from "react-router-dom";
import LeiloesPaginacaoContext from './contexts/LeiloesPaginacaoContext';
import LeilaoPage from './pages/LeilaoPage';
import AppHeader from './components/AppHeader';

function App() {
  const [autenticado, setAuthenticated] = React.useState(autenticadoModel.userAutenticado());
  const [leiloesPaginacao, setLeiloesPaginacao] = React.useState(leiloesPaginacaoModel.defaultValue())

  let location = useLocation<{ background?: Location<{} | null | undefined> }>();

  let background = location.state && location.state.background;

  return (
    <AutenticadoContext.Provider value={{ autenticado: autenticadoModel.userAutenticado(), setAuthenticated }}>
      <LeiloesPaginacaoContext.Provider value={{ dados: leiloesPaginacao, setDados: setLeiloesPaginacao }}>
        <AppHeader />
        <AppMenu />
        <Switch location={background || location}>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/leilao/:leilao_id" component={LeilaoPage} />
        </Switch>

        {background && <Route path="/leilao/:leilao_id" children={<LeilaoModalPage />} />}
      </LeiloesPaginacaoContext.Provider>
    </AutenticadoContext.Provider>
  );
}

export default App;
