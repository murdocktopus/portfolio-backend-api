const express = require("express");
const app = express();
require("dotenv").config();
const { PORT } = process.env;
const blogPosts = require("./routes/blog-posts");
const cors = require("cors");

/*
 * Middleware
 */
app.use(express.json()); // adds req.body
app.use(express.static("public")); // adds public folder for serving images
app.use(cors()); // allow cross origin resource sharing

/*
 * Underware
 */

app.get("/", (req, res) => {
  res.send("Welcome to my Brainflix Video API");
});

app.use("/blog-posts", blogPosts);

app.listen(PORT, () => {
  console.log(`Hello! My server is listening on ${PORT}`);
});
