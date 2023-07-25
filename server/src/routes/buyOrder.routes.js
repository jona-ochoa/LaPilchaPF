const express = require("express");
const BuyOrder = require("../models/buyOrder"); // Suponiendo que el modelo es BuyOrder con 'B' mayúscula
const User = require("../models/user")

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const order = new BuyOrder(req.body);
    if (!order.status || !order.total || !order.items || !order.userId ) {
      return res.status(400).json({ message: "Orden de compra incompleta." });
    }
    const savedOrder = await order.save();

    const userId = order.userId
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { buyhistory: savedOrder._id } },
      { new: true }
    );

    return res.status(200).json({ message: "Orden de compra posteada con éxito.", data: savedOrder });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/", (req, res) => {
  BuyOrder.find()
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  BuyOrder.findOne({ _id: id })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: `No se encuentra el ID` });
      }
      return res.status(200).json(data);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  BuyOrder.findOneAndRemove({ _id: id })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: `No se encuentra el ID` });
      }
      return res.status(200).json({ message: "Orden de compra eliminada.", data });
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
