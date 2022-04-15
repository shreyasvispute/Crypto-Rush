const cryptoData = require("./cryptoApi");
const validations = require("./validations");
const tweetData = require("./twitterAPI");
const exchangeData = require("./exchangeApi");

module.exports = {
  cryptoData: cryptoData,
  tweetData: tweetData,
  validations: validations,
  exchangeData: exchangeData,
};
