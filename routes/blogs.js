const { Blog, validateBlog } = require("../models/blog");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
  const blog = await Blog.find();
  res.send(blog);
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) res.status(404).send("Blog not found");
  res.send(blog);
});

router.put("/:id", auth, admin, async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title, blogdata: req.body.blogdata },
    { new: true }
  );
  if (!blog) res.status(404).send("Blog not found");
  res.send(blog);
});

router.post("/new", async (req, res) => {
  console.log(req.body);
  const { error } = validateBlog(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const blog = await new Blog(req.body);
  res.send(await blog.save());
});

router.delete("/:id", auth, admin, async (req, res) => {
  const blog = await Blog.findByIdAndRemove(req.params.id);
  if (!blog) return res.status(404).send("Blog not available");
  res.send(blog);
});

module.exports = router;
