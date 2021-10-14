import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from "./components/AppHeader"
import AppMenu from "./components/AppMenu"
import AppBody from "./components/AppBody"
import AutenticadoContext from "./contexts/AutenticadoContext"
import { autenticadoModel } from "./models/autenticado.model"

function App() {
  const [autenticado, setAuthenticated] = React.useState(autenticadoModel.userAutenticado());

  return (
    <AutenticadoContext.Provider value={{autenticado: autenticadoModel.userAutenticado(),setAuthenticated}}>
      <AppHeader />
      <AppMenu />
      <AppBody />
    </AutenticadoContext.Provider>
  );
}

export default App;
