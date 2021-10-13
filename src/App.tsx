import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from "./components/AppHeader"
import AutenticadoContext from "./contexts/AutenticadoContext"
import { autenticadoModel } from "./models/autenticado.model"
import { IUsuarioLogado } from './interfaces/usuario.logado';

function App() {
  const [autenticado, setAuthenticated] = React.useState(autenticadoModel.naoAutenticado());

  const updateSetAuthenticated = (dados: any) => {
    console.log('================================================')
    console.log(dados);
    setAuthenticated(dados.authenticated)
  }
  

  return (
    <AutenticadoContext.Provider value={{autenticado,setAuthenticated}}>
      <AppHeader />
    </AutenticadoContext.Provider>
  );
}

export default App;
