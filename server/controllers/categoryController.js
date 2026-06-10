const Category = require("../models/Category");

const getCategories = async (req, res) => {

  const categories =
    await Category.find();

  res.json(categories);
};

const createCategory = async (
  req,
  res
) => {

  const category =
    await Category.create(req.body);

  res.status(201).json(category);
};

module.exports = {
  getCategories,
  createCategory,
};