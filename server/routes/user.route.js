const { Router } = require("express");
const express = require("express");
const router = express.Router();
//getting User schema
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const helper = require("../helpers/helper");

//api endpoint for registration
router.post("/api/register", async (req, res) => {
  // validate email address, if incorrect return false
  if (!helper.isEmailValid(req.body.email)) {
    return res.json({ status: "error", error: "Invalid Email Address!" });
  }

  // validate if phone number is valid
  if (!helper.isValidPhone(req.body.phone)) {
    return res.json({
      status: "error",
      error: "Provide a valid 11 digit phone number!",
    });
  }

  // validate if base64 image is valid
  if (!helper.isValidBase64(req.body.image)) {
    return res.json({
      status: "error",
      error: "Provide a valid image file!",
    });
  }

  try {
    // encrypting the password
    const newPassword = await bcrypt.hash(req.body.password, 10);
    //creating User document according to schema
    const user = await User.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: newPassword,
      image: req.body.image,
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
  // if not a valied email, return error
  if (!helper.isEmailValid(req.body.email)) {
    return res.json({
      status: "error",
      error: "Provide a valid Email Address!",
    });
  }
  // get user from db
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.json({ status: "error", error: "User does not exist!" });
  }

  // checking if user password is valid
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  //if user password is valid, return user with jwt
  if (isPasswordValid) {
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
    return res.json({
      status: "error",
      error: "Invalid Password",
      user: false,
    });
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
    res.json({ status: "ok", name: user.name, image: user.image });
  } catch (err) {
    // if token not valid, return error msg
    console.log(err);
    res.json({ status: "error", error: "Invalid Token" });
  }
});

module.exports = router;
