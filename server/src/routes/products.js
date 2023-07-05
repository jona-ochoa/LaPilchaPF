const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Ruta para obtener todos los productos
router.get("/", (req, res) => {
  // Ruta completa al archivo db.json
  const filePath = path.join(__dirname, "../api/db.json");

  // Leer el archivo db.json
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

module.exports = router;
