import React from 'react';
import './App.css';
import HomePage from "./pages/HomePage";
import LeilaoApresentacao from "pages/Leilao/Apresentacao";
import { Location } from "history";
import { Route, Switch, useLocation } from "react-router-dom";
import LoginModal from './pages/LoginModal';
import CadastroModal from './pages/CadastroModal';
import LeilaoIncluirModal from './pages/Leilao/IncluirModal';

function AppRoute() {

  let location = useLocation<{ background?: Location<{} | null | undefined> }>();

  let background = location.state && location.state.background;

    return (
        <>
            <Switch location={background || location}>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route exact path="/leilao/:leilao_id">
                    <LeilaoApresentacao isModal={false} />
                </Route>
            </Switch>

            {background &&
                <Switch location={location}>
                    <Route exact path="/leilao/:leilao_id">
                        <LeilaoApresentacao isModal={true} />
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
        </>
    )
}

export default AppRoute;