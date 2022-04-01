const express = require("express");
const router = express.Router();
const dataModule = require("../data");
const exchangeData = dataModule.exchangeData;

router.get("/exchange", async (req, res) => {
    try {
      let exchangeData1 = await exchangeData.getExchange();
      console.log(exchangeData1)
      res.status(200).json(mappingData);c
    } catch (error) {
        res.json(error)
    //   res.status(error.response.status).json({ message: error.response.statusText });
    }
  });
  module.exports = router;