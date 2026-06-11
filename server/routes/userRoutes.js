const express = require("express");

const router = express.Router();

const { getProfile, updateProfile, getUsers } = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.get("/", protect, adminOnly, getUsers);

module.exports = router;