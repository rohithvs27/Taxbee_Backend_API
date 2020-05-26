const Joi = require("joi");
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
  },
  date: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);

function validateBlog(blog) {
  const joiSchema = {
    title: Joi.string().min(1).required(),
    content: Joi.string().min(1).required(),
  };
  return Joi.validate(blog, joiSchema);
}

exports.Blog = Blog;
exports.validateBlog = validateBlog;
