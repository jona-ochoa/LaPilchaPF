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
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  buyhistory: {
    type: Array,
    required: false,
  },
  isAdmin: {  // Nueva propiedad para indicar si el usuario es admin
    type: Boolean,
    default: false,
  },
  isBanned: {  // Nueva propiedad para indicar si el usuario está baneado
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);