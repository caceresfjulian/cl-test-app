import React, { useContext, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import AuthContext from "../contexto/Contexto";

function ImagenForm() {
  //capturar los datos a enviar
  const [imagen, setImagen] = useState("");
  const [imageType, setImageType] = useState("");
  const [titulo, setTitulo] = useState("");
  const [colorFuente, setColorFuente] = useState(undefined);
  const [filtro, setFiltro] = useState(undefined);

  //Leer email del usuario actual
  const { emailLoggeado } = useContext(AuthContext);

  //enviar imagen a backend con sus demás datos
  async function procesarImagen(e) {
    e.preventDefault();
    try {
      swal("Cargando", "Espera un momento.", "info", {
        button: false,
      });

      const datosRegistrados = {
        email: emailLoggeado,
        imagen,
        filtro,
      };

      await axios
        .post("http://localhost:4000/images", datosRegistrados)
        .then((res) => {
          if (res.status === 200) {
            swal("¡Éxito!", res.data, "success");
            setImagen("");
            setImageType("");
          } else {
            swal("Error", res.data, "error");
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  //subir imagen al frontend validando su tamaño y tipo
  function subirImagen(file) {
    const reader = new FileReader();
    if (reader !== undefined && file !== undefined) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        swal(
          "Formato incorrecto",
          "El archivo debe ser .png o .jpg. Vuelve a intentar.",
          "warning"
        );
      } else if (file.size > 2000000) {
        swal(
          "Tamaño incorrecto",
          "El tamaño máximo es 2mb. Vuelve a intentar",
          "warning"
        );
      } else {
        file.type === "image/png" ? setImageType("png") : setImageType("jpeg");
        reader.onloadend = (e) => {
          setImagen(btoa(e.target.result));
        };
        reader.readAsBinaryString(file);
      }
    }
  }

  if (imagen) {
    return (
      <div
        className="container pt-3 d-flex align-items-center"
        style={{ flexDirection: "column" }}
      >
        <h1 className="pb-3">Subir imagen</h1>
        <div className="card pt-4 px-4">
          <form
            onSubmit={procesarImagen}
            encType="multipart/form-data"
            className="d-flex"
            style={{ flexDirection: "column" }}
          >
            <label
              className="card-img-top d-flex align-items-center"
              style={{ flexDirection: "column", cursor: "pointer" }}
            >
              <input
                type="file"
                accept=".png, .jpg"
                onChange={(e) => subirImagen(e.target.files[0])}
                style={{ display: "none" }}
              />
              <img
                className="card-img-top"
                src={
                  imageType === "image/png"
                    ? `data:image/png;base64,${imagen}`
                    : `data:image/jpg;base64,${imagen}`
                }
                alt="Upload file"
                style={{ maxWidth: 200 }}
              />
              <span>*Sube un archivo PNG o JPEG. Límite 2 MB</span>
            </label>
            <div
              className="card-body d-flex"
              style={{ flexDirection: "column" }}
            >
              <input
                className="form-control mb-3"
                type="text"
                placeholder="Título de la imagen (opcional)"
                value={titulo}
                maxLength="100"
                onChange={(e) => setTitulo(e.target.value)}
              />
              <label className="mb-3">
                <span>Color</span>
                <select
                  className="form-control"
                  placeholder="Colores"
                  onChange={(e) => setColorFuente(e.target.value)}
                  value={colorFuente}
                >
                  <option value="">Ninguno</option>
                  <option value="negro">Negro</option>
                  <option value="blanco">Blanco</option>
                  <option value="rojo">Rojo</option>
                </select>
              </label>
              <label className="mb-3">
                <span>Filtro</span>
                <select
                  className="form-control"
                  placeholder="Filtros"
                  onChange={(e) => setFiltro(e.target.value)}
                  value={filtro}
                >
                  <option value="">Ninguno</option>
                  <option value="gris">Grises</option>
                  <option value="sepia">Sepia</option>
                </select>
              </label>
              <button className="btn btn-success" type="submit">
                Procesar imagen
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="container pt-3 d-flex align-items-center"
        style={{ flexDirection: "column" }}
      >
        <h1 className="pb-3">Subir imagen</h1>
        <div className="card pt-4 px-4">
          <form
            onSubmit={procesarImagen}
            encType="multipart/form-data"
            className="d-flex"
            style={{ flexDirection: "column" }}
          >
            <label
              className="card-img-top d-flex align-items-center"
              style={{ flexDirection: "column", cursor: "pointer" }}
            >
              <input
                type="file"
                accept=".png, .jpg"
                onChange={(e) => subirImagen(e.target.files[0])}
                style={{ display: "none" }}
              />
              <svg
                width="55"
                height="64"
                viewBox="0 0 71 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-3"
              >
                <path
                  d="M65.4531 39.0802V56.4552C65.4531 57.8337 64.209 58.9552 62.6797 58.9552H8.32031C6.79104 58.9552 5.54688 57.8337 5.54688 56.4552V39.0802H0V56.4552C0 60.5907 3.73249 63.9552 8.32031 63.9552H62.6797C67.2675 63.9552 71 60.5907 71 56.4552V39.0802H65.4531Z"
                  fill="black"
                />
                <path
                  d="M35.5 0.0455322L18.2653 15.581L22.1875 19.1165L32.7265 9.61653V48.581H38.2734V9.61653L48.8124 19.1165L52.7346 15.581L35.5 0.0455322Z"
                  fill="black"
                />
              </svg>
              <span>*Sube un archivo PNG o JPEG. Límite 2 MB</span>
            </label>
            <div
              className="card-body d-flex"
              style={{ flexDirection: "column" }}
            >
              <input
                className="form-control mb-3"
                type="text"
                placeholder="Título de la imagen (opcional)"
                value={titulo}
                maxLength="100"
                onChange={(e) => setTitulo(e.target.value)}
              />
              <label className="mb-3">
                <span>Color</span>
                <select
                  className="form-control"
                  placeholder="Colores"
                  onChange={(e) => setColorFuente(e.target.value)}
                  value={colorFuente}
                >
                  <option value="">Ninguno</option>
                  <option value="negro">Negro</option>
                  <option value="blanco">Blanco</option>
                  <option value="rojo">Rojo</option>
                </select>
              </label>
              <label className="mb-3">
                <span>Filtro</span>
                <select
                  className="form-control"
                  placeholder="Filtros"
                  onChange={(e) => setFiltro(e.target.value)}
                  value={filtro}
                >
                  <option value="">Ninguno</option>
                  <option value="Gris">Grises</option>
                  <option value="Sepia">Sepia</option>
                </select>
              </label>
              <button className="btn btn-success" type="submit">
                Procesar imagen
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ImagenForm;
