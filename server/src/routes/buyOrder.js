const express = require("express");
const buyOrderSchema = require("../models/buyOrder");

const router = express.Router();

//create order demo
router.post("/order", (req, res) => {
  const order = buyOrderSchema(req.body);
  order
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/order", (req, res) => {
    buyOrderSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

router.get("/order/:id", (req, res) => {
  const { id } = req.params;
  buyOrderSchema
  .findOne({ _id: id })
  .then((data) => res.json(data))
  .catch((error) => res.json({ message: error }));
})

router.delete("/order/:id", (req,res) => {
  const { id } = req.params;
  buyOrderSchema
    .findOneAndRemove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }))
})

module.exports = router;
