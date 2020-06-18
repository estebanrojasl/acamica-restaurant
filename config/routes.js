const express = require("express");
const usersController = require("../src/controllers/users-controller");
const productsController = require("../src/controllers/products-controller");
const authMiddleware = require("./middlewares/auth-middleware");

const initApiRoutes = () => {
  const router = express.Router();

  router.get("/users", usersController.getUsers);
  router.get("/products", productsController.getProducts);
  router.post("/users/signup", usersController.createUser);
  router.post("/users/login", usersController.logUser);
  //   router.put("/users", usersController.updateUser);

  return router;
};

module.exports = { initApiRoutes };
