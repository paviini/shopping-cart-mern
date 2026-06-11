const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
{
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    default: "",
  },

  telephone: {
    type: String,
    default: "",
  },

  gender: {
    type: String,
    default: "",
  },

  address: {
    type: String,
    default: "",
  },

  city: {
    type: String,
    default: "",
  },

  bio: {
    type: String,
    default: "",
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true,
}
);

module.exports =
mongoose.model("User", userSchema);