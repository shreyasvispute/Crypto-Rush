const crypto = require("./cryptoAPI");
const nft = require("./nftAPI");
const tweets = require("./twitterApi");
const login = require("./login");

//Call your respective apis here

const constructorMethod = (app) => {
  app.use("/", crypto);
  app.use("/login", login);
  app.use("/tweets", tweets);
  app.use("/cryptocurrency", crypto);
  app.use("/nft", nft);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Path Not Found" });
  });
};

module.exports = constructorMethod;
