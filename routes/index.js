const crypto = require("./apiRoutes");
const tweets = require("./twitterApi");

//Call your respective apis here

const constructorMethod = (app) => {
  app.use("/", crypto);
  app.use("/tweets", tweets);


  app.use("*", (req, res) => {
    res.status(404).json({ error: "Path Not Found" });
  });
};

module.exports = constructorMethod;
