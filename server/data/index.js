const cryptoData = require("./cryptoApi");
const nftData = require("./nftAPI");
const validations = require("./validations");
const tweetData = require("./twitterAPI");
const exchangeData = require("./exchangeApi");
const database = require("./firebaseData");
const newsData = require("./newsApi");

module.exports = {
  cryptoData: cryptoData,
  nftData: nftData,
  tweetData: tweetData,
  validations: validations,
  exchangeData: exchangeData,
  database: database,
  newsData: newsData,
};
