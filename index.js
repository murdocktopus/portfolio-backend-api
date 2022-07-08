const express = require("express");
const app = express();
require("dotenv").config();
const { PORT } = process.env;
const blogPosts = require("./routes/blog-posts");
const foundBlogPost = require("./routes/blog-posts");
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
  res.send("Welcome to the JMDb API");
});

// app.get("/blog-posts", (req, res) => {
//   res.json(blogPosts);
// });

// app.get("/blog-post/:id", (req, res) => {
//   // Reading isbn from the URL
//   const id = req.params.id;

//   for (let blogPost of posts) {
//     if (blogPost.id === id) {
//       res.json(blogPost);
//       return;
//     }
//   }

//   // Sending 404 when not found something is a good practice
//   res.status(404).send("Book not found");
// });

app.use("/blog-posts", blogPosts);

app.listen(PORT, () => {
  console.log(`Hello! My server is listening on ${PORT}`);
});
