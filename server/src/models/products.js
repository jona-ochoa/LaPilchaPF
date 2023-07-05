const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    id: {
        type: String,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: String,
        required: true,
      },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    requires: true,
  },
  category: {
    type: String,
    required: true,
  }, 
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model("User", productSchema);
