const { Router } = require("express");
const express = require("express");
const router = express.Router();
//getting User schema
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

//api endpoint for registration
router.post("/api/register", async (req, res) => {
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
router.post("/api/login", async (req, res) => {
  // get user from db
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  //if user account exists
  if (user) {
    //initiate a jwt token for the logged in user
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "supersecret"
    );

    //send the jwt token to client app
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

//api endpoint for userData
router.get("/api/userdata", async (req, res) => {
  // get token from header request
  const token = req.headers["x-access-token"];
  // if token exists, verify token and proceed
  try {
    const decoded = jwt.verify(token, "supersecret");
    const email = decoded.email;
    // get userdata from db
    const user = await User.findOne({ email: email });
    // send user name to client
    res.json({ status: "ok", name: user.name });
  } catch (err) {
    // if token not valid, return error msg
    console.log(err);
    res.json({ status: "error", error: "Invalid Token" });
  }
});

module.exports = router;
