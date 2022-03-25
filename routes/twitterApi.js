const express = require("express");
const router = express.Router();
const dataModule = require("../data");
const tweetdata = dataModule.tweetData;

router.get("/", async(req, res) => {
    try {
      console.log("here");
      const result = await tweetdata.getAlltweets();
      console.log(result);
      res.json(result);
      return;
    } catch (error) {
      res.status(404).json({ message: "Page not found" });
    }
});


module.exports =router;