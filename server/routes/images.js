const express = require("express");
const jimp = require("jimp");

const router = express.Router();
const pool = require("../database/database");

//Guardar una imagen
router.post("/", async (req, res) => {
  const { email, imagen, filtro } = req.body;

  if (!imagen) {
    res.status(202).send("Cargue una imagen.");
  }

  if (filtro == "sepia") {
    const imagenEditada = await jimp.read("imagen");
    imagenEditada.sepia();
    let imagenGuardada = await pool.query(
      `INSERT INTO images (email, imagen) VALUES ('${email}', '${img}')`
    );
    if (imagenGuardada) {
      res.send("Imagen guardada.");
    }
  } else {
    let imagenGuardada = await pool.query(
      `INSERT INTO images (email, imagen) VALUES ('${email}', '${imagen}')`
    );
    if (imagenGuardada) {
      res.send("Imagen guardada.");
    }
  }
});

//Enviar todas las imágenes del usuario
router.post("/galeria", async (req, res) => {
  try {
    const { emailLoggeado } = req.body;

    console.log("Solicitando galería", emailLoggeado);

    const response = await pool.query(
      `SELECT * FROM images WHERE email = '${emailLoggeado}'`
    );

    res.json(response);
  } catch (error) {}
});

module.exports = router;
