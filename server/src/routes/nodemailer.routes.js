const express = require("express");
const sendEmail = require('../controllers/nodemailer');
const sendEmailOrder = require("../controllers/nodemailerOrder");
const sendEmailRegister= require("../controllers/nodemailerRegister");
// const sendEmailForgotPassword = require("../controllers/nodemailerForgotPassword")

const router = express.Router();

router.post("/contacto", sendEmail);
router.post("/orden-de-compra", sendEmailOrder)
router.post("/register", sendEmailRegister)
// router.post("/forgot-password", sendEmailForgotPassword)
// router.get("/forgot-password", (req, res) => {
    // res.send("Esta ruta es para el proceso de recuperación de contraseña por correo electrónico!")
// })

module.exports = router;
