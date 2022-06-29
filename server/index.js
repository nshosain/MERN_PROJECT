const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
//connect API Endpoints
const router = require("./routes/user.route");

//configuring middlewares
app.use(cors());
app.use(express.json());
app.use(router);

//running server on port:1337
app.listen(1337, () => {
  console.log("Server started on 1337");
});

//connecting to database - mongodb
mongoose
  .connect(
    "mongodb+srv://nazmulhosain:mnbv0987@cluster0.6yfcy.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB Connected");
  });
