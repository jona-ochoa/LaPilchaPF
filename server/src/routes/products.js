const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", (req, res) => {
  axios
    .get("https://fakestoreapi.com/products")
    .then((response) => {
      const products = response.data;
      res.json({ products });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los productos" });
    });
});

module.exports = router;
