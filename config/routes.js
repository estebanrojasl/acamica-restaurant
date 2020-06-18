const express = require("express");
const usersController = require("../src/controllers/users-controller");
const productsController = require("../src/controllers/products-controller");
const ordersController = require("../src/controllers/orders-controller");
const authMiddleware = require("./middlewares/auth-middleware");

const initApiRoutes = () => {
  const router = express.Router();

  router.get("/products", productsController.getProducts);
  router.post(
    "/products",
    authMiddleware.validateJWT,
    authMiddleware.validateAdmin,
    productsController.createProduct
  );

  router.get("/users", usersController.getUsers);
  router.post("/users/signup", usersController.createUser);
  router.post("/users/login", usersController.logUser);

  router.get("/orders", ordersController.getOrders);

  // router.post(
  //   "/orders/neworder",
  //   authMiddleware.validateJWT,
  //   ordersController.logUser
  // );

  return router;
};

module.exports = { initApiRoutes };
