const express = require("express");
const usersController = require("../src/controllers/user-controller");
const authMiddleware = require("./middlewares/auth-middleware");

const initApiRoutes = () => {
  const router = express.Router();

  router.get("/users", authMiddleware.validateJWT, usersController.getUsers);
  router.post("/users", usersController.createUser);
  router.put("/users", usersController.updateUser);

  return router;
};

module.exports = { initApiRoutes };
