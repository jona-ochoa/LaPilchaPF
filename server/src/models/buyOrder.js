const mongoose = require("mongoose");

const buyOrderSchema = mongoose.Schema({
  status: {
    type: String,
    enum: [
      'shopping_cart',
      'created',
      'processing',
      'canceled',
      'completed',
    ],
    required: false,
    default: 'shopping_cart',
  },
  total: {
    type: Number,
    required: false,
  },
  products: {
    type: [String],
  },
});

module.exports = mongoose.model("BuyOrder", buyOrderSchema);
