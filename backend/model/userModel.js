const mongoose = require("mongoose");

const userData = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // trim: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    // trim: true,
  },
  number: {
    type: Number,
    required: true,
    // unique: true,
    // trim: true,
  },
  password: {
    type: String,
    required: true,
    // minlength: 6
  },
});

module.exports = mongoose.model("User", userData);
