const axios = require("axios");
const validations = require("./validations");
require("dotenv").config();

// Import coingecko-api
const CoinGecko = require('coingecko-api');
// Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();


async function getExchange() {  
  // Make calls
  let pData = await CoinGeckoClient.ping();
  //console.log(pData)
  let eData = await CoinGeckoClient.exchanges.all();
  //console.log(eData)
  if(eData.code===200){
    return eData;
  }else{
    throw {
      response: { status: 404, statusText: `No data found.` },
    }
  }
};

module.exports = {
    getExchange
  };