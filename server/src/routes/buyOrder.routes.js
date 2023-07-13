const express = require("express");
const buyOrderSchema = require("../models/buyOrder");

const router = express.Router();

//create order de compra endpoint example: http://localhost:3002/orders
router.post("/", async (req, res) => {
  const order = buyOrderSchema(req.body);
  if (!order.status || !order.total || !order.items)
    res.status(400).json({ message: "Orden de compra incompleta." });
  else {
    try {
      order
        .save()
        .then((data) => {
          try {
            return res
              .status(200)
              .json({ message: "Orden de compra posteada con éxito.", data });
          } catch (error) {
            return res.json({ message: error.message });
          }
        })
        .catch((error) => res.status(500).json({ message: error.message }));
    } catch (error) {
      res.json({ message: error.message });
    }
  }
});

router.get("/", (req, res) => {
  buyOrderSchema
    .find()
    .then((data) => {
      if (!data) res.status(404).json({ message: error.message });
      return res.status(200).json(data);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

// endpoint example: http://localhost:3002/admin/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  buyOrderSchema
    .findOne({ _id: id })
    .then((data) => {
      if (!data) res.status(404).json({ message: `No se encuentra el ID` });
      return res.status(200).json(data);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  buyOrderSchema
    .findOneAndRemove({ _id: id })
    .then((data) => {
      return res
        .status(200)
        .json({ message: "Orden de compra eliminada.", data });
    })
    .catch((error) => res.json({ message: error.message }));
});

module.exports = router;
