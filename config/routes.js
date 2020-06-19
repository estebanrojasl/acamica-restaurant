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
  router.put(
    "/products/:id",
    authMiddleware.validateJWT,
    authMiddleware.validateAdmin,
    productsController.updateProduct
  );
  //no se puede por las FK -> active = 0? con un update
  router.delete(
    "/products/:id",
    authMiddleware.validateJWT,
    authMiddleware.validateAdmin,
    productsController.deleteProduct
  );

  router.get("/users", usersController.getUsers);
  router.post("/users/signup", usersController.createUser);
  router.post("/users/login", usersController.logUser);

  //como organizar la respuesta de sql en json
  router.get(
    "/orders/:username",
    authMiddleware.validateJWT,
    authMiddleware.validateUser,
    ordersController.getOrders
  );

  // router.post(
  //   "/orders/neworder",
  //   authMiddleware.validateJWT,
  //   ordersController.logUser
  // );

  return router;
};

module.exports = { initApiRoutes };
