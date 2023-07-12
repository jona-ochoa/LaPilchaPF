const express = require("express");
const sendEmail = require('../controllers/nodemailer')

const router = express.Router();

router.post("/purchase", sendEmail);

module.exports = router;
