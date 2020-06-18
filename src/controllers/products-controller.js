const productService = require("../services/product-service");

const getProducts = async (req, res) => {
  try {
    const productInfo = await productService.getProductsDb();
    return res.status(200).json(productInfo);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const createProduct = async (req, res) => {
  try {
    await productService.createProductDb(req);
    return res.status(204).json();
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = { getProducts, createProduct };
