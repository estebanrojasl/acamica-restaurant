const orderService = require("../services/order-service");

const getOrders = async (req, res) => {
  try {
    const orderInfo = await orderService.getOrdersDb();
    return res.status(200).json(orderInfo);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = { getOrders };
