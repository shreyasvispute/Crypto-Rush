const express = require("express");
const router = express.Router();
const dataModule = require("../data");
const cryptoData = dataModule.cryptoData;
const validations = dataModule.validations;

//Returns a mapping of all cryptocurrencies to unique CoinMarketCap ids
router.get("/map", async (req, res) => {
  try {
    let mappingData = await cryptoData.getCryptoMapping();
    res.status(200).json(mappingData);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ message: error.response.statusText });
  }
});

//Returns the latest listings of all cryptocurrencies
router.get("/listings", async (req, res) => {
  try {
    let listingData = await cryptoData.getCryptoListings();
    res.status(200).json(listingData);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ message: error.response.statusText });
  }
});

//Returns the latest listing for a cryptocurrency
router.get("/quotes/:symbol", async (req, res) => {
  try {
    let symbol = req.params.symbol;
    validations.validateString(symbol, "Symbol");
    let quotesData = await cryptoData.getCryptoQuotes(symbol);
    res.status(200).json(quotesData);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ message: error.response.statusText });
  }
});

//Returns the historical data for a cryptocurrency
router.get("/history/:symbol/:days", async (req, res) => {
  try {
    let symbol = req.params.symbol;
    let days = req.params.days;
    validations.validateString(symbol, "Symbol");
    validations.validateNumber(Number(days), "Days");
    let historicalData = await cryptoData.getCryptoHistory(symbol, days);
    res.status(200).json(historicalData);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ message: error.response.statusText });
  }
});

module.exports = router;
