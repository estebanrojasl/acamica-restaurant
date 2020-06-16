const validateJWT = (req, res, next) => {
  console.log("Middleware working");
  next();
};

module.exports = { validateJWT };
