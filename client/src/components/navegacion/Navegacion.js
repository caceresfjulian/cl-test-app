import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexto/Contexto";
import Desloggeo from "../desloggeo/Desloggeo";

function Navegacion() {
  const { loggeado, emailLoggeado } = useContext(AuthContext);

  if (loggeado === true) {
    return (
      <div className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
        <div>
          <span className="navbar-brand">Filtro de fotos</span>
          <span className="badge badge-secondary">{emailLoggeado}</span>
        </div>
        <div>
          <ul className="navbar-nav">
            <Link to="/imagen">
              <li className="nav-item">
                <span className="nav-link">Subir imágenes</span>
              </li>
            </Link>
            <Link to="/galeria">
              <li className="nav-item">
                <span className="nav-link">Galería</span>
              </li>
            </Link>
            <Desloggeo />
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand">Filtro de fotos</span>
        <ul className="navbar-nav">
          <Link to="/login">
            <li className="nav-item">
              <span className="nav-link">Login</span>
            </li>
          </Link>
          <Link to="/registro">
            <li className="nav-item">
              <span className="nav-link">Registro</span>
            </li>
          </Link>
        </ul>
      </div>
    );
  }
}

export default Navegacion;
