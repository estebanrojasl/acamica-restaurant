const validateJWT = (req, res, next) => {
  // Hago mi lógica
  console.log("Pasó por middleware");
  // descifro
  // valido propiedad es_admin
  next();
};

module.exports = { validateJWT };
