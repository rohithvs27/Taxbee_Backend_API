const Joi = require("joi");
const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
  isAdmin: { type: Boolean, default: false },
  phone: {
    type: Number,
    required: true,
    length: 10,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtprivatekey")
  );
};

const User = mongoose.model("Users", userSchema);

function validateUser(user) {
  const joiUserSchema = {
    name: Joi.string().required().min(5),
    isAdmin: Joi.boolean(),
    phone: Joi.string().min(10).max(10).required(),
    password: Joi.string().min(4).required(),
  };
  return Joi.validate(user, joiUserSchema);
}

exports.User = User;
exports.validateUser = validateUser;
