const express = require("express");
const routes = express();

const userRoutes = require("./user.routes");
const productFilter = require("../filters/filters");
const productRouter = require("./products.routes");
const buyOrderRouter = require("./buyOrder.routes");
const adminRouter = require("./admin.routes");
const paymenRoutes = require("./payment.routes");
const nodemailerRoutes = require("./nodemailer.routes");

//routes
routes.use("/", userRoutes);
routes.use("/products", productRouter);
routes.use("/orders", buyOrderRouter);
routes.use("/admins", adminRouter);
routes.use("/pay", paymenRoutes);
routes.use("/filters", productFilter);
routes.use("/nodemailer", nodemailerRoutes);

module.exports = routes;
