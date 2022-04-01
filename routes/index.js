const crypto = require("./apiRoutes");
const tweets = require("./twitterApi");
const exchange = require("./exchangeApi")

//Call your respective apis here

const constructorMethod = (app) => {

  app.use("/", crypto);
  app.use("/exchange",exchange)
  app.use("/tweets", tweets);
  app.use("/cryptocurrency", crypto);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Path Not Found" });
  });
};

module.exports = constructorMethod;
