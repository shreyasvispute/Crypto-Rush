const express = require("express");
const router = express.Router();
const dataModule = require("../data");
const cryptoData = dataModule.cryptoData;

router.get("/", (req, res) => {
  try {
    console.log("first api");
  } catch (error) {
    res.status(404).json({ message: "Page not found" });
  }
});

module.exports = router;
