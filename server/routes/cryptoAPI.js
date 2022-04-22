const express = require("express");
const router = express.Router();
const dataModule = require("../data");
const cryptoData = dataModule.cryptoData;
const validations = dataModule.validations;
const auth = dataModule.database;

//creating user with firebase
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const mappingData = await auth.signIn(email, password);
    res.json(mappingData);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ message: error.response.statusText });
  }
});
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email ID id required" });
  }
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  try {
    validations.validateString(email);
    validations.validateString(password);

    const mappingData = await auth.createUser(email, password);
    res.json(mappingData);
  } catch (error) {
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ message: error.response.statusText });
    } else {
      return res.status(500).json({ error: error.message });
    }
  }
});

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
