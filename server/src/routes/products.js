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
