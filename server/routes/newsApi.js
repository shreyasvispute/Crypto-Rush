const express = require("express");
const router = express.Router();
const dataModule = require("../data");
const newsData = dataModule.newsData;

router.get("/", async(req, res) => {
    try {

      let searchTerm = "";

      if(req.params){

        searchTerm = req.params.keyWord;

      }else{
        searchTerm = "crypto";
      }

      
      //console.log("here");
      const result = await newsData.getNewsByKeyword(searchTerm);
      //console.log(result);
      res.json(result);
      return;
    } catch (error) {
      res.status(404).json({ message: `${error}` });
    }
});


router.get("/:keyWord", async(req, res) => {
  try {

    let searchTerm = "";

    if(req.params){

      searchTerm = req.params.keyWord;

    }else{
      searchTerm = "crypto";
    }

    
    //console.log("here");
    const result = await newsData.getNewsByKeyword(searchTerm);
    //console.log(result);
    res.json(result);
    return;
  } catch (error) {
    res.status(404).json({ message: `${error}` });
  }
});

module.exports = router;