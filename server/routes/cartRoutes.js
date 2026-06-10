const express = require("express");
const router = express.Router();

const {
  getCart,
  addToCart,
} = require("../controllers/cartController");

router.get("/", getCart);
router.post("/add", addToCart);

module.exports = router;