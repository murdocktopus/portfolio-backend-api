const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

/*
 * Get collection of blogPosts as array of objects
 */
router.get("/", (req, res) => {
  fs.readFile("./data/blog-posts.json", "utf8", (err, data) => {
    const blogPostsData = JSON.parse(data);
    res.json(blogPostsData);
    res.send(data); // doesn't set header but will return json
  });
});

/*
 * Get single blog-post by id
 */
router.get("/blog-post/:id", (req, res) => {
  fs.readFile("./data/blog-posts.json", "utf8", (err, data) => {
    const blogPostsData = JSON.parse(data);
    const foundBlogPost = blogPostsData.find(
      (element) => element.id === req.params.id
    );
    if (foundBlogPost) {
      res.json(foundBlogPost);
    } else {
      res.send("no blog post found with that id");
    }
  });
});

/*
 * Create a new blog post
 */
router.post("/", (req, res) => {
  console.log(req.body);
  // read JSON file
  fs.readFile("./data/blog-posts.json", "utf8", (err, data) => {
    const blogPostsData = JSON.parse(data);
    // create new object to push to local array before saving to blogPosts.json
    const newBlogPost = {
      id: uuidv4(), // creating unique id
      title: req.body.title,
      channel: "Anonymous",
      image: "/images/sponge.jpg",
      description: req.body.description, // incoming req.body
      views: "0",
      likes: "0",
      duration: "4:20",
      blogPost: "/images/wow.mp4",
      timestamp: Date.now(),
      comments: [],
    };
    // push new object to local array
    blogPostsData.push(newBlogPost);
    // write data back to JSON file
    fs.writeFile(
      "./data/blog-posts.json",
      JSON.stringify(blogPostsData),
      () => {
        res.json({ message: "data written to file", data: blogPostsData });
      }
    );
  });
});

module.exports = router;
