const ENV = process.env.NODE_ENV || "development";
const jwt = require("jsonwebtoken");
const { config } = require("../environments/" + ENV);

const validateJWT = (req, res, next) => {
  const jwtToken = req.headers["authorization"];
  if (!jwtToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const jwtClient = jwtToken.split(" ")[1];
  jwt.verify(jwtClient, config.JwtSecretKey, (error, decoded) => {
    if (error) {
      console.log(error);
      return res.status(401).json({ message: "Expired token" });
    } else {
      next();
    }
  });
};

const validateUser = (req, res, next) => {
  const jwtToken = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(jwtToken, config.JwtSecretKey);
  if (decoded.username !== req.params.username) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    next();
  }
};
const validateAdmin = (req, res, next) => {
  const jwtToken = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(jwtToken, config.JwtSecretKey);
  if (decoded.admin === 0) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    next();
  }
};

module.exports = { validateJWT, validateAdmin, validateUser };
