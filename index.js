const config = require("config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogs = require("./routes/blogs");
const users = require("./routes/users");
const auth = require("./routes/auth");
const home = require("./routes/home");

if (!config.get("jwtprivatekey")) {
  console.log("FATAL ERROR");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());
app.use("/blog", blogs);
app.use("/users", users);
app.use("/auth", auth);
app.use("/", home);

mongoose
  .connect(
    "mongodb+srv://admin:ceEaUtCttBpI6jXU@cluster0-k4ndh.gcp.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to Mongo DB...");
  })
  .catch((err) => console.error("Could not connect", err));

//PORT
const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Listening on port " + port));
