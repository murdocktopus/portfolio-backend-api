const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

/*
 * Get collection of videos as array of objects
 */
router.get("/", (req, res) => {
  fs.readFile("./data/videos.json", "utf8", (err, data) => {
    const videosData = JSON.parse(data);
    res.json(videosData);
    // res.send(data); // doesn't set header but will return json
  });
});

/*
 * Get single video by id
 */
router.get("/video/:id", (req, res) => {
  fs.readFile("./data/videos.json", "utf8", (err, data) => {
    const videosData = JSON.parse(data);
    const foundVideo = videosData.find((video) => video.id === req.params.id);
    if (foundVideo) {
      res.json(foundVideo);
    } else {
      res.send("no video found with that id");
    }
  });
});

/*
 * Create a new video
 */
router.post("/", (req, res) => {
  console.log(req.body);
  // read JSON file
  fs.readFile("./data/videos.json", "utf8", (err, data) => {
    const videosData = JSON.parse(data);
    // create new object to push to local array before saving to videos.json
    const newVideo = {
      id: uuidv4(), // creating unique id
      title: req.body.title,
      channel: "Anonymous",
      image:
        "https://cdn.vox-cdn.com/thumbor/ywwImRtZDaNCI6Hnwl6Bo5Z7j6I=/0x0:1920x1080/1200x800/filters:focal(807x387:1113x693)/cdn.vox-cdn.com/uploads/chorus_image/image/63718716/spongebob_characters_wallpaper_thumb_1920_637740.0.jpg",
      description: req.body.description, // incoming req.body?
      views: "0",
      likes: "0",
      duration: "4:20",
      video: "https://project-2-api.herokuapp.com/stream",
      timestamp: Date.now(),
      comments: [],
    };
    // push new object to local array
    videosData.push(newVideo);
    // write data back to JSON file
    fs.writeFile("./data/videos.json", JSON.stringify(videosData), () => {
      res.json({ message: "data written to file", data: videosData });
    });
  });
});

module.exports = router;
