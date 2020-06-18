const validateJWT = (req, res, next) => {
  const jwtToken = req.headers["authorization"];
  if (!jwtToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const jwtClient = jwtToken.split(" ")[1];
  jwt.verify(jwtClient, privateKey, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Expired token" });
    }
    next();
  });
};

module.exports = { validateJWT };
