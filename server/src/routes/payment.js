const express = require("express");
const router = express.Router();
const { createOrder, reciveWebhook } = require("../controllers/payment");

router.post("/create-order", createOrder);

router.get("/pending", (req, res) => {
  res.send("pending");
});

router.get("/failure", (req, res) => {
  res.send("failure");
});

router.get("/success", (req, res) => {
  res.send("success");
});

//ruta que escucha los eventos lanzados desde el servidor de MP
router.post("/webhook", reciveWebhook);

module.exports = router;
