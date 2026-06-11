const User = require("../models/User");
const jwt = require("jsonwebtoken");

const googleLogin = async (req, res) => {
  try {

    const { name, email, photo } = req.body;

    let user = await User.findOne({ email });

    if (!user) {

      user = await User.create({
        name,
        email,
        password: "google-user",
      });

    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      photo,
      token,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  googleLogin,
};