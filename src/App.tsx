import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from "./components/AppHeader"
import AppMenu from "./components/AppMenu"
import AppBody from "./components/AppBody"
import AutenticadoContext from "./contexts/AutenticadoContext"
import { autenticadoModel } from "./models/autenticado.model"

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
      <AppMenu />
      <AppBody />
    </AutenticadoContext.Provider>
  );
}

export default App;
