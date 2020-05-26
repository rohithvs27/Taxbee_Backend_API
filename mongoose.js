const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: String,
  blogdata: String,
  date: { type: Date, default: Date.now },
  author: String,
});

mongoose
  .connect(
    "mongodb+srv://admin:ceEaUtCttBpI6jXU@cluster0-k4ndh.gcp.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to Mongo DB...");
  })
  .catch((err) => console.error("Could not connect", err));

const Blog = mongoose.model("Blog", blogSchema);

async function createBlog() {
  const blog = new Blog({
    title: " Second Blog",
    blogdata: "Second test blog",
    author: "Thenna",
  });
  const result = await blog.save();
  console.log(result);
}

async function getBlogs() {
  const blogs = await Blog.find({ author: "Rohith" });
  console.log(blogs);
}

async function updateBlogs(id) {
  const blog = await Blog.findById(id);
  if (!blog) return;
  blog.blogdata = "How are you";
  blog.author = "Nithiya";

  const result = await blog.save();
  console.log(result);
}

updateBlogs("5ecb629d0142632559b3e1ae");
