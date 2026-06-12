const Product = require("../models/Product");

const getProducts = async (req, res) => {
  const products = await Product.find().populate("category");
  res.json(products);
};

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
  res.json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.json({ message: "Product deleted" });
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};