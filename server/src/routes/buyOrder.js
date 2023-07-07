const express = require("express");
const buyOrderSchema = require("../models/buyOrder");

const router = express.Router();

//create order demo
router.post("/", (req, res) => {
  const order = buyOrderSchema(req.body);
  order
    .save()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/", (req, res) => {
    buyOrderSchema
      .find()
      .then((data) => {
        if(!data) res.status(404).json({ message: error })
        res.json(data)
      })
      .catch((error) => res.status(500).json({ message: error }));
  });

router.get("/:id", (req, res) => {
  const { id } = req.params;
  buyOrderSchema
  .findOne({ _id: id })
  .then((data) => {
    if(!data) res.status(404).json({ message: `ID not found` })
    res.json(data)
  })
  .catch((error) => res.status(500).json({ message: error }));
})

router.delete("/:id", (req,res) => {
  const { id } = req.params;
  buyOrderSchema
    .findOneAndRemove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }))
})

module.exports = router;
