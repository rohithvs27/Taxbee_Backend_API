const express = require("express");
const { User } = require("../models/user");
const Joi = require("joi");
const router = express.Router();
const mongoose = require("mongoose");
const bryct = require("bcrypt");

router.post("/", async (req, res) => {
  const { error } = validateUserAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ phone: req.body.phone });
  if (!user) return res.status(400).send("Invalid phone or password");

  const validPassword = await bryct.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid phone or password");

  const token = user.generateAuthToken();
  res.send(token);
});

function validateUserAuth(req) {
  const joiUserAuthSchema = {
    phone: Joi.string().min(10).max(10).required(),
    password: Joi.string().min(4).required(),
  };
  return Joi.validate(req, joiUserAuthSchema);
}

module.exports = router;
