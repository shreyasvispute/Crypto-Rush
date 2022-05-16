const express = require("express");
const router = express.Router();
const dataModule = require("../data");
const newsData = dataModule.newsData;
const validations = require("../data/validations");

router.get("/", async (req, res) => {
  try {
    const result = await newsData.getNews();
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: `${error}` });
  }
});

router.get("/:keyWord", async (req, res) => {
  try {
    let searchTerm = "";

    if (req.params) {
      searchTerm = req.params.keyWord;
      validations.validateString(searchTerm, "Keyword");
    } else {
      searchTerm = "crypto";
    }

    const result = await newsData.getNewsByKeyword(searchTerm);
    res.json(result);
    return;
  } catch (error) {
    res.status(404).json({ message: `${error}` });
  }
});

module.exports = router;
