const express = require("express");
const { checkIfAuthenticated } = require("../authMiddleware");
const router = express.Router();
const dataModule = require("../data");
const firebaseData = dataModule.database;
const validations = dataModule.validations;

router.post("/setState", async (req, res) => {
  try {
    let state = req.body.state;
    let stateStored = await firebaseData.storeStateToDB(state);
    res.status(200).json(stateStored);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ message: error.response.statusText });
  }
});

router.get("/getState/:user", async (req, res) => {
  try {
    let fetchedState = await firebaseData.fetchStateFromDB(req.params.user);
    res.status(200).json(fetchedState);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ message: error.response.statusText });
  }
});

router.get("/updateState/", async (req, res) => {
  try {
    let state = req.body.state;
    let fetchedState = await firebaseData.updateStateInDB(state);
    res.status(200).json(fetchedState);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ message: error.response.statusText });
  }
});

router.get("/deleteState/:user", async (req, res) => {
  try {
    let fetchedState = await firebaseData.deleteStateFromDB(req.params.user);
    res.status(200).json(fetchedState);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ message: error.response.statusText });
  }
});

module.exports = router;
