const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const userRoutes = require("./src/routes/user");

const productFilter = require("./src/filters/filters");

const productRouter = require("./src/routes/products");
const buyOrderRouter = require("./src/routes/buyOrder");
const adminRouter = require("./src/routes/admin");
const paymenRoutes = require("./src/routes/payment");
const nodemailerRoutes = require("./src/routes/nodemailer");

const cors = require("cors");

const app = express();
const port = process.env.PORT || 3002;

//middleware
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

//routes
app.use("/", userRoutes);
app.use("/products", productRouter);
app.use("/orders", buyOrderRouter);
app.use("/admins", adminRouter);
app.use("/pay", paymenRoutes);
app.use("/filters", productFilter);
app.use("/email", nodemailerRoutes);

//mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.log(console.error(error)));

app.listen(port, () => {
  console.log(`Servcer listen on port ${port}`);
});
