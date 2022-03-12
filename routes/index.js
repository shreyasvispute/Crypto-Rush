const crypto = require("./apiRoutes");

//Call your respective apis here

const constructorMethod = (app) => {
  app.use("/", crypto);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Path Not Found" });
  });
};

module.exports = constructorMethod;
