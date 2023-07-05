const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./src/routes/user");

const app = express();
const port = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use("/", userRoutes);

//routes
app.get("/", (req, res) => {
  res.send("Welcome to LaPilcha");
});

//mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.log(console.error(error)));

app.listen(port, () => {
  console.log(`Servcer listen on port ${port}`);
});