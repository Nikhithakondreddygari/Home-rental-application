const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const authRoute = require('./router/auth');

app.use(cors());
app.use(express.json());
app.use(express.static("public")); //to serve static files from public directory

// MONGOOSE SETUP
const PORT = 3040;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => console.log(err));

/* ROUTES */
app.use("/", authRoute)

app.listen(process.env.PORT || PORT, () => {
  console.log(`server connected to the port ${process.env.PORT}`);
});
