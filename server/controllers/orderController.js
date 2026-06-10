const Order =
  require("../models/Order");

const createOrder =
  async (req, res) => {

    const order =
      await Order.create(
        req.body
      );

    res.status(201)
      .json(order);
};

const getOrders =
  async (req, res) => {

    const orders =
      await Order.find();

    res.json(orders);
};

module.exports = {
  createOrder,
  getOrders,
};