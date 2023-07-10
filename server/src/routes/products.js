const express = require("express");
const router = express.Router();
const products = require("../models/products");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
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


// Ruta para crear un nuevo producto
router.post("/", (req, res) => {
  const { title, price, description, category, image, rating } = req.body;

  // Validar que se proporcionen todos los campos requeridos
  if (!title || !price || !description || !category || !image) {
    return res.status(400).json({ error: "Por favor, proporcione todos los campos requeridos" });
  }

  // Crear un nuevo objeto de producto
  const newProduct = new products({
    title,
    price,
    description,
    category,
    image,
    rating,
  });

  // Guardar el producto en la base de datos
  newProduct
    .save()
    .then((product) => {
      res.status(201).json({ message: "Producto creado exitosamente", product });
    })
    .catch((error) => res.status(400).json({ error: "Error al crear el producto" }));
});

// Ruta para editar un producto por su ID
router.put("/:id", (req, res) => {
  const productId = req.params.id;

  // Obtener los datos actualizados del producto desde el cuerpo de la solicitud
  const { title, price, description, category, image, rating } = req.body;

  // Construir el objeto con los campos actualizados
  const updatedProduct = {
    title,
    price,
    description,
    category,
    image,
    rating,
  };

  // Actualizar el producto en la base de datos
  products
    .findByIdAndUpdate(productId, updatedProduct, { new: true })
    .then((updatedProduct) => {
      if (!updatedProduct) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json({ message: "Producto actualizado exitosamente", product: updatedProduct });
    })
    .catch((error) => res.status(500).json({ error: `Error al actualizar el producto con ID ${productId}` }));
});

// Ruta para eliminar un producto por su ID
router.delete("/:id", (req, res) => {
  const productId = req.params.id;

  products
    .findByIdAndDelete(productId)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json({ message: "Producto eliminado exitosamente" });
    })
    .catch((error) => res.status(500).json({ error: `Error al eliminar el producto con ID ${productId}` }));
});


module.exports = router;

