const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const routes = require("./src/routes/index.routes");

const cors = require("cors");

const app = express();
const port = process.env.PORT || 3002;

//middleware
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

//routes
app.use(routes);

//mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.log(console.error(error)));

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
