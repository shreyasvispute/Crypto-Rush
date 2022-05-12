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

router.get("/:keyWord", async(req, res) => {
  try {
    console.log("here");
    let request = req.params.keyWord;

    if(typeof request != "string" ){
      throw `invalid input `;
    }
    const result = await tweetdata.getAlltweets(request);
    console.log(result);
    res.json(result);
    return;
  } catch (error) {
    res.status(404).json({ message: "Page not found" });
  }
});

module.exports =router;