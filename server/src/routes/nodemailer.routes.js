const express = require("express");
const sendEmail = require('../controllers/nodemailer');
const sendEmailOrder = require("../controllers/nodemailerOrder");

const router = express.Router();

router.post("/contacto", sendEmail);
router.post("/orden-de-compra", sendEmailOrder)

module.exports = router;
