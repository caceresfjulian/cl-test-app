const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const pool = require("../database/database");

//ruta de prueba
router.get("/", async (req, res) => {
  let ans = await pool.query("SELECT * FROM users");
  console.log(ans);
  res.send(ans);
});

//Crear cuenta y loggearse automáticamente
router.post("/", async (req, res) => {
  const { email, nombre, password, passwordVerificado } = req.body;

  //Validaciones
  if (!email || !nombre || !password || !passwordVerificado ) {
    return res.status(202).send("Por favor, llene el formulario por completo.");
  }

  if (password !== passwordVerificado) {
    return res
      .status(202)
      .send("Revisa que la contraseña esté correctamente verificada.");
  }

  let usuarioExistente = await pool.query(
    `SELECT * FROM users WHERE email = '${email}'`
  );

  if (usuarioExistente.length !== 0) {
    res.status(202).send("Ya existe un usuario con el correo provisto.");
  } else {
    //Encripción de la contraseña
    const salt = await bcrypt.genSalt();
    const passwordEncriptado = await bcrypt.hash(password, salt);

    //Guardar información en db
    let usuarioGuardado = await pool.query(
      `INSERT INTO users (email, nombre, password) VALUES ('${email}', '${nombre}', '${passwordEncriptado}')`
    );

    //Crear un token y enviarlo en una cookie
    const token = jwt.sign({ email }, process.env.JWT_SECRET);

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  }
});

//Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //Validaciones
  if (!email || !password) {
    return res.status(202).send("Por favor, llene el formulario por completo.");
  }

  const usuarioExistente = await pool.query(
    `SELECT * FROM users WHERE email = '${email}'`
  );

  if (usuarioExistente.length == 0) {
    return res.status(202).send("Email o contraseña incorrectos.");
  }

  const passwordCorrecto = await bcrypt.compare(
    password,
    usuarioExistente[0].password
  );

  if (!passwordCorrecto) {
    return res.status(202).send("Email o contraseña incorrectos.");
  }

  //Crear token y enviarlo en una cookie
  const token = jwt.sign({ email }, process.env.JWT_SECRET);

  res
    .cookie("token", token, {
      httpOnly: true,
    })
    .send();

});

//Verificar cookie
router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ value: false }).status(401);
    }

    jwt.verify(token, process.env.JWT_SECRET);

    const { payload } = jwt.decode(token, { complete: true });
    const { email } = payload;

    res.json({ email, value: true });
  } catch (error) {
    res.json({ value: false }).status(401);
  }
});

//Desloggearse
router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

module.exports = router;
