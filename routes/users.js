const { User, validateUser } = require("../models/user");
const express = require("express");
const router = express.Router();
const lodash = require("lodash");
const mongoose = require("mongoose");
const bryct = require("bcrypt");
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/new", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ phone: req.body.phone });
  if (user) return res.status(400).send("Phone number already registered");

  user = await new User(lodash.pick(req.body, ["name", "phone", "password"]));
  const salt = await bryct.genSalt(10);
  user.password = await bryct.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(lodash.pick(user, ["_id", "name", "phone"]));
});

module.exports = router;
