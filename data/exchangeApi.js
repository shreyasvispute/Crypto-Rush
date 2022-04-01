const axios = require("axios");
const validations = require("./validations");
require("dotenv").config();

// Import coingecko-api
const CoinGecko = require('coingecko-api');

// Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

// Make calls
async function getExchange() {
  let pdata = await CoinGeckoClient.ping();
  console.log(pdata)
  let edata = await CoinGeckoClient.exchanges.all();
  console.log(edata)
  return edata;
};

module.exports = {
    getExchange
  };