const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
//getting User schema
const User = require("./models/user.model");

//configuring middlewares
app.use(cors());
app.use(express.json());

//running server on port:1337
app.listen(1337, () => {
  console.log("Server started on 1337");
});

//connecting to database - mongodb
mongoose.connect(
  "mongodb+srv://nazmulhosain:mnbv0987@cluster0.6yfcy.mongodb.net/?retryWrites=true&w=majority"
);

//api endpoint for registration
app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    //creating User document according to schema
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (err) {
    // can not make account with duplicate email
    if (err.code == 11000) {
      res.json({ status: "error", error: "Email Already Exists!" });
    } else {
      res.json({ status: "error", error: err });
    }
  }
});

//api endpoint for login
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    return res.json({ status: "ok", user: ture });
  } else {
    return res.json({ status: "error", user: false });
  }
});
