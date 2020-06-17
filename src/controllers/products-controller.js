const productService = require("../services/product-service");

const getProducts = (req, res) => {
  return productService
    .getProductsDb()
    .then((productInfo) => res.status(200).json(productInfo))
    .catch((err) => {
      return res.status(500).json(err);
    });
};

const createUser = (req, res) => {
  return res.status(200).json("Create Users");
};

const updateUser = (req, res) => {
  return res.status(200).json("Update Users");
};

module.exports = { getProducts, createUser, updateUser };
