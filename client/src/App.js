import React from "react";
import { AuthContextProvider } from "./components/contexto/Contexto";
import Router from "./Router";
import axios from 'axios';
import './App.css';

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
