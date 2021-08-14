import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Registro from "./components/registro/Registro";
import Navegacion from "./components/navegacion/Navegacion";
import AuthContext from "./components/contexto/Contexto";
import ImagenForm from "./components/imagenForm/ImagenForm";
import Galeria from "./components/galeria/Galeria";

function Router() {
  const { loggeado } = useContext(AuthContext);

  if (loggeado === true) {
    return (
      <BrowserRouter>
        <Navegacion/>
        <Switch>
          <Route path="/imagen" component={ImagenForm} />
          <Route path="/galeria" component={Galeria} />
          <Route path="*" component={ImagenForm} />
        </Switch>
      </BrowserRouter>
    )
  } else {
    return (
      <BrowserRouter>
        <Navegacion />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/registro" component={Registro} />
          <Route path="*" component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
