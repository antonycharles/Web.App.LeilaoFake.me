import React from 'react';
import './App.css';
import HomePage from "./pages/HomePage";
import Pagina404 from 'pages/Pagina404';
import LeilaoApresentacao from "pages/Leilao/Apresentacao";
import { Location } from "history";
import { Route, Switch, useLocation } from "react-router-dom";
import LoginModal from './pages/LoginModal';
import CadastroModal from './pages/CadastroModal';
import LeilaoIncluirModal from './pages/Leilao/IncluirModal';
import LeilaoAlterarModal from 'pages/Leilao/AlterarModal';
import EditarImagem from 'pages/Leilao/EditarImagem';

function AppRoute() {

    let location = useLocation<{ background?: Location<{} | null | undefined> }>();

    let background = location.state && location.state.background;

    return (
        <>
            <Switch location={background || location}>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/leilao/:leilao_id" component={LeilaoApresentacao}/>
                <Route>
                    <Pagina404 />
                </Route>
            </Switch>

            {background &&
                <Switch location={location}>
                    <Route exact path="/leilao/incluir" component={LeilaoIncluirModal}/>
                    <Route exact path="/leilao/alterar/:leilao_id" component={LeilaoAlterarModal}/>
                    <Route exact path="/leilao/editar-imagem/:leilao_id" component={EditarImagem}/>
                    <Route exact path="/leilao/:leilao_id" component={LeilaoApresentacao}/>
                    <Route exact path="/login" component={LoginModal}/>
                    <Route exact path="/cadastro" component={CadastroModal}/>
                </Switch>
            }
        </>
    )
}

export default AppRoute;