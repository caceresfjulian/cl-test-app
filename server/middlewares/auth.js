const jwt = require("jsonwebtoken");

//Middleware para verificar la existencia de la cookie con cada solicitud realizada
function auth(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send("No autorizado.");
    }

    //Validat token
    const tokenVerificado = jwt.verify(token, process.env.JWT_SECRET);

    req.email = tokenVerificado.email;
    //Añadir el usuario verificado al token
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send("No autorizado.");
  }
}

module.exports = auth;
