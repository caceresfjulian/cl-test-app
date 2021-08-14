import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import swal from "sweetalert";
import AuthContext from "../contexto/Contexto";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { verificarCookie } = useContext(AuthContext);
  const historial = useHistory();

  const loggearse = (e) => {
    e.preventDefault();
    try {
      const datosLogin = {
        email,
        password,
      };

      axios
        .post("http://localhost:4000/users/login", datosLogin)
        .then((res) => {
          if (res.status === 200) {
            swal("Bienvenido", "Disfruta tu visita", "success");
            verificarCookie().then(() => historial.push("/imagen"));
          } else {
            swal("Error", res.data, "error");
          }
        });
    } catch (error) {
      swal(error);
    }
  };

  return (
    <div
      className="container pt-3 d-flex align-items-center"
      style={{ flexDirection: "column" }}
    >
      <h1 className="pb-3">Login</h1>
      <div className="card p-4" style={{ width: "18rem" }}>
        <form
          className="d-flex"
          style={{ flexDirection: "column" }}
          onSubmit={loggearse}
        >
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-control my-2"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input className="btn btn-success" type="submit" value="Ingresar"/> 
        </form>
      </div>
    </div>
  );
}

export default Login;
