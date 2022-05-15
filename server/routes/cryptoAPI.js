const express = require("express");
const { checkIfAuthenticated } = require("../authMiddleware");
const router = express.Router();
const dataModule = require("../data");
const cryptoData = dataModule.cryptoData;
const validations = dataModule.validations;

//Returns a mapping of all cryptocurrencies to unique CoinMarketCap ids
router.get("/map", checkIfAuthenticated, async (req, res) => {
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

//Returns the latest listings of all cryptocurrencies
router.get("/listings/:list", checkIfAuthenticated, async (req, res) => {
  try {
    validations.validateString(req.params.list, "Cryptocurrency List");
    let listingData = await cryptoData.getCryptoListingsByList(req.params.list);
    res.status(200).json(listingData);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ message: error.response.statusText });
  }
});

//Returns the latest listings of all cryptocurrencies
router.get("/search/:searchTerm", checkIfAuthenticated, async (req, res) => {
  try {
    let searchTerm = req.params.searchTerm;
    validations.validateString(searchTerm, "Search Term");
    let searchData = await cryptoData.searchCrypto(searchTerm);
    res.status(200).json(searchData);
    return;
  } catch (error) {
    res
      .status(error.response.status)
      .json({ message: error.response.statusText });
  }
});

//Returns the latest listing for a cryptocurrency
router.get("/quotes/:symbol", checkIfAuthenticated, async (req, res) => {
  try {
    let symbol = req.params.symbol;
    validations.validateString(symbol, "Symbol");
    let quotesData = await cryptoData.getCryptoQuotesBySymbol(symbol);
    res.status(200).json(quotesData);
    return;
  } catch (error) {
    res
      .status(error.response.status)
      .json({ message: error.response.statusText });
  }
});

//Returns the historical data for a cryptocurrency
router.get(
  "/history/:symbol/days/:days",
  checkIfAuthenticated,
  async (req, res) => {
    try {
      let symbol = req.params.symbol;
      let days = req.params.days;
      validations.validateString(symbol, "Symbol");
      validations.validateNumber(Number(days), "Days");
      let historicalData = await cryptoData.getCryptoHistoryByDays(
        symbol,
        days
      );
      res.status(200).json(historicalData);
    } catch (error) {
      res
        .status(error.response.status)
        .json({ message: error.response.statusText });
    }
  }
);

//Returns the historical data for a cryptocurrency
router.get(
  "/history/:symbol/hours/:hours",
  checkIfAuthenticated,
  async (req, res) => {
    try {
      let symbol = req.params.symbol;
      let hours = req.params.hours;
      validations.validateString(symbol, "Symbol");
      validations.validateNumber(Number(hours), "Hours");
      let historicalData = await cryptoData.getCryptoHistoryByHours(
        symbol,
        hours
      );
      res.status(200).json(historicalData);
    } catch (error) {
      res
        .status(error.response.status)
        .json({ message: error.response.statusText });
    }
  }
);

module.exports = router;
