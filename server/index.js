const express = require("express");
const http = require('http');
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const routes = require("./src/routes/index.routes");

const cors = require("cors");

const app = express();
const port = process.env.PORT || 3002;
// const urlPublic = "https://lapilchapf.vercel.app" || "http://localhost:3000"

//middleware
app.use(morgan("dev"));
app.use(cors({ origin: "https://lapilchapf.vercel.app" }));
// app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

//routes
app.use("/api/v1", routes);

const server = http.createServer(app);
//mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Server listen on port ${port}`);
    });
    console.log("Connected to MongoDB Atlas")
  })
  .catch((error) => console.log(console.error(error)));
  