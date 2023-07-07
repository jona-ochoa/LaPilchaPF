const express = require("express");
const router = express.Router();
const products = require("../models/products");

// Ruta para obtener todos los productos
router.get("/", (req, res) => {
  products
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Ruta para buscar productos por nombre
router.get("/search", (req, res) => {
  const keyword = req.query.keyword;

  products
    .find({ $text: { $search: keyword } })
    .then((filteredProducts) => res.json({ products: filteredProducts }))
    .catch((error) => res.status(400).json({ error: "Error al obtener los productos" }));
});

// Ruta para buscar por id
router.get("/:id", (req, res) => {
  const productId = req.params.id;

  products
    .findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json({ product });
    })
    .catch((error) => res.status(500).json({ error: `Error al obtener el producto con id ${productId}` }));
});

module.exports = router;

/* router.get("/search", (req, res) => {
  const keyword = req.query.keyword;

  // Leer el archivo db.json
  fs.readFile(path.join(__dirname, "../api/db.json"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al obtener los productos" });
    }

    try {
      const db = JSON.parse(data);
      const products = db.products;

      // Filtrar los productos que contengan la palabra clave en el título
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(keyword.toLowerCase())
      );

      res.json({ products: filteredProducts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los productos" });
    }
  });
}); */
