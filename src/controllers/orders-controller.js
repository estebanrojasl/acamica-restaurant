const orderService = require("../services/order-service");

const getOrders = async (req, res) => {
  try {
    const orderInfo = await orderService.getOrdersDb(req, res);
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

const createOrder = async (req, res) => {
  try {
    const orderInfo = await orderService.createOrderDb(req, res);
    return res.status(201).json({ message: "created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const updateOrder = async (req, res) => {
  try {
    await orderService.updateOrderDb(req);
    return res.status(201).json({ message: "updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = { getOrders, getAllOrders, createOrder, updateOrder };
