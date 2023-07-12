const express = require("express");
const router = express.Router();
const products = require("../models/products");

router.get("/", (req, res) => {
  const minPrice = parseInt(req.query.minPrice);
  const maxPrice = parseInt(req.query.maxPrice);
  const category = req.query.category;

  let filter = {};

  if (minPrice && maxPrice) {
    filter = { price: { $gte: minPrice, $lte: maxPrice } };
  } else if (minPrice) {
    filter = { price: { $gte: minPrice } };
  } else if (maxPrice) {
    filter = { price: { $lte: maxPrice } };
  }

  if (category) {
    filter = { $and: [filter, { category: category }] };
  }

  products
    .find(filter)
    .then((products) => {
      res.json({ products });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error finding products." });
    });
});

module.exports = router