import React, { useContext } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import AuthContext from "../contexto/Contexto";

function Desloggeo() {
  const { verificarCookie } = useContext(AuthContext);
  const historial = useHistory();

  async function logOut() {
    await axios.get("http://localhost:4000/users/logout");
    await verificarCookie();
    historial.push("/");
  }

  return (
      <li className="nav-item">
        <span className="btn btn-danger" onClick={logOut} style={{cursor: 'pointer'}}>
          Log out
        </span>
      </li>
  );
}

export default Desloggeo;
