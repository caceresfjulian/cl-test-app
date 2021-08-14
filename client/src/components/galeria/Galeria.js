import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ListaImagenes from "./ListaImagenes";
import AuthContext from "../contexto/Contexto";

function Galeria() {
  //almacenar imágenes recibidas
  const [imagenes, setImagenes] = useState();

  //Obtener correo validado
  const { emailLoggeado } = useContext(AuthContext);

  useEffect(() => {
    async function obtenerImagenes() {
      await axios
        .post("http://localhost:4000/images/galeria", { emailLoggeado })
        .then((res) => {
          setImagenes(res.data);
        });
    }
    obtenerImagenes();
  }, [emailLoggeado]);


  return (
    <div>
      <ListaImagenes imagenes={imagenes} />
    </div>
  );
}

export default Galeria;
