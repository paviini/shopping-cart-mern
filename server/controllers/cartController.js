const Cart = require("../models/Cart");

const getCart = async (req, res) => {
  const cart = await Cart.find()
    .populate("user")
    .populate("product");

  res.json(cart);
};

const addToCart = async (req, res) => {
  const cartItem = await Cart.create(req.body);
  res.status(201).json(cartItem);
};

module.exports = {
  getCart,
  addToCart,
};