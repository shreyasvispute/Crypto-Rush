const express = require("express");
const router = express.Router();
const dataModule = require("../data");
const exchangeData = dataModule.exchangeData;

router.get("/", async (req, res) => {
  try {
    let exchangeData1 = await exchangeData.getExchange();
    //console.log(exchangeData1)
    res.status(200).json(exchangeData1)
  } catch (error) {
      res.json(error)
  }
});


module.exports = router;