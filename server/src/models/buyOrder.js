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
    type: [Object],
    required: true
  },
  userId:{
    type: String,
    ref: 'User',
    required: true,
  }
},{
  timestamps: true, 
  versionKey: false
});

module.exports = mongoose.model("BuyOrder", buyOrderSchema)
