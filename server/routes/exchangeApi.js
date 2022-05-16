const express = require("express");
const router = express.Router();
const dataModule = require("../data");
const exchangeData = dataModule.exchangeData;
const validations = dataModule.validations;

router.get("/", async (req, res) => {
  try {
    let exchangeData1 = await exchangeData.getExchange();
    res.json(exchangeData1);
  } catch (error) {
    res.json(error);
  }
});

router.get("/list", async (req, res) => {
  try {
    let exchangeListData = await exchangeData.getExchangeList();

    res.status(200).json(exchangeListData);
  } catch (error) {
    res.json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let exchangeId = req.params.id;
    validations.validateString(exchangeId, "exchangeId");
    let exchangeDataId = await exchangeData.getExchangeById(exchangeId);
    //console.log(exchangeDataId)
    res.status(200).json(exchangeDataId);
  } catch (error) {
    res.json(error);
  }
});

router.get("/:id/tickers", async (req, res) => {
  try {
    let id = req.params.id;
    validations.validateString(id, "id");
    let tickersData = await exchangeData.getTickers(id);
    res.status(200).json(tickersData);
  } catch (error) {
    res.json(error);
  }
});
router.get("/:id/volume_chart/:days", async (req, res) => {
  try {
    let exchangeId = req.params.id;
    let days = req.params.days;
    validations.validateString(exchangeId, "exchangeId");
    let exchangeDataId = await exchangeData.getExchangeVolById(
      exchangeId,
      days
    );
    //console.log(exchangeDataId)
    res.status(200).json(exchangeDataId);
  } catch (error) {
    res.json(error);
  }
});

router.get("/search/:searchTerm", async (req, res) => {
  try {
    let searchTerm = req.params.searchTerm;
    validations.validateString(searchTerm, "search Term");
    let exchangeData1 = await exchangeData.searchExchange(searchTerm);
    res.json(exchangeData1);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
