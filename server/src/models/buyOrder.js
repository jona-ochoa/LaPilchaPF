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
    required: true,
    default: 'shopping_cart',
  },
  total: {
    type: Number,
    required: true,
  },
  items: {
    type: [String],
    required: true
  },
},{
  tymestamps: true, 
  versionKey: false
});

module.exports = mongoose.model("BuyOrder", buyOrderSchema)
