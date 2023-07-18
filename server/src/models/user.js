const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    requires: true,
  },
  password: {
    type: String,
    required: true,
  },
  buyhistory: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
