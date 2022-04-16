const cryptoData = require("./cryptoAPI");
const nftData = require("./nftAPI");
const validations = require("./validations");
const tweetData = require("./twitterAPI");

module.exports = {
  cryptoData: cryptoData,
  nftData: nftData,
  tweetData: tweetData,
  validations: validations,
};
