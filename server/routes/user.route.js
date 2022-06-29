const { Router } = require("express");
const express = require("express");
const router = express.Router();
//getting User schema
const User = require("../models/user.model");

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

module.exports = router;
