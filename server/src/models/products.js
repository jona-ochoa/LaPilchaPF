const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  id: {
    type: String,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
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
  isDeactivated: {  // Nueva propiedad para indicar si el producto está desactivado
    type: Boolean,
    default: false,
  },
  count: {
    type: Number,
    default: 0,
    required: false,
  }
});

productSchema.index({ title: "text" }); // Definir índice de texto en el campo "title"

module.exports = mongoose.model("Product", productSchema);