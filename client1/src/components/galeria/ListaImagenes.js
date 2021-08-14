import React from "react";

function ListaImagenes({ imagenes }) {
  if (imagenes) {
    return (
      <div className="container">
        <h1>Lista de imágenes</h1>
        <div className="row">
          {imagenes.map((imagen, key) => {
            return (
              <div className="col-4" key={key}>
                <div className="card">
                  <a
                    download="imagen.jpg"
                    href={`data:image/jpg;base64,` + imagen.imagen}
                  >
                    <img
                      src={`data:image/jpg;base64,` + imagen.imagen}
                      alt="Cargada"
                      className="card-img-top"
                    />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
    // return imagenes.map((imagen, key) => {
    //   return (
    //     <div key={key}>
    //       <h1>{imagen.email}</h1>
    //       <img
    //         src={`data:image/png;base64,` + String(imagen.imagen_codificada.data.toString('base64'))}
    //         alt="Cargadas"
    //       />
    //     </div>
  } else {
    return <h1>Cargando</h1>;
  }
}

export default ListaImagenes;
