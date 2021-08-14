import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import swal from "sweetalert";
import AuthContext from "../contexto/Contexto";

function Registro() {
  //Capturar información del formularo en estados
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerificado, setPasswordVerificado] = useState("");

  const { verificarCookie } = useContext(AuthContext);
  const historial = useHistory();

  //Función para loggeo
  async function loggearse(e) {
    e.preventDefault();
    try {
      const datosRegistro = {
        email,
        nombre,
        password,
        passwordVerificado, 
      };
      axios.post("http://localhost:4000/users/", datosRegistro).then((res) => {
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
  }

  return (
    <div
      className="container pt-3 d-flex align-items-center"
      style={{ flexDirection: "column" }}
    >
      <h1 className="pb-3">Crear una cuenta</h1>
      <div className="card p-4" style={{ width: "18rem" }}>
        <form
          className="d-flex"
          style={{ flexDirection: "column" }}
          onSubmit={loggearse}
        >
          <input
            className="form-control mb-2"
            type="text"
            placeholder="Nombre"
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            className="form-control mb-2"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-control mb-2"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="form-control mb-3"
            type="password"
            placeholder="Verifique su contraseña"
            onChange={(e) => setPasswordVerificado(e.target.value)}
          />
          <input className="btn btn-success" type="submit" value="Registrar"/>
        </form>
      </div>
    </div>
  );
}

export default Registro;
