const orderService = require("../services/order-service");

const getOrders = async (req, res) => {
  try {
    const orderInfo = await orderService.getOrdersDb(req.params.username);
    return res.status(200).json(orderInfo);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orderInfo = await orderService.getAllOrdersDb();
    return res.status(200).json(orderInfo);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = { getOrders, getAllOrders };
