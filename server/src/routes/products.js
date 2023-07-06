const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Ruta para obtener todos los productos
router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../api/db.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al leer el archivo" });
    }

    const jsonData = JSON.parse(data);
    const products = jsonData.products;
    res.json({ products });
  });
});

//ruta para buscar por id
router.get("/:id", (req, res) => {
  const productId = parseInt(req.params.id);

  // Leer el archivo db.json
  fs.readFile(path.join(__dirname, "../api/db.json"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al obtener el producto" });
    }

    try {
      const db = JSON.parse(data);
      const products = db.products;

      // Buscar el producto por su ID
      const product = products.find((product) => product.id === productId);

      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      res.json({ product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener el producto" });
    }
  });
});

// Ruta para buscar productos por nombre
router.get("/search", (req, res) => {
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
  });
  

module.exports = router;
