const express = require("express");
const app = express();
require("dotenv").config();
const { PORT } = process.env;
const videos = require("./routes/videos");
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

app.use("/videos", videos);

app.listen(PORT, () => {
  console.log(`Hello! My server is listening on ${PORT}`);
});
