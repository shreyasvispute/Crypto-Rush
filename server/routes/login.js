const express = require("express");
const router = express.Router();
const dataModule = require("../data");
const validations = dataModule.validations;
const auth = dataModule.database;

//creating user with firebase
router.post("/signup", async (req, res) => {
  const { displayName, email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email ID id required" });
  }
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }
  if (!displayName) {
    return res.status(400).json({ error: "Display Name is required" });
  }
  try {
    validations.validateString(email);

    const mappingData = await auth.createUser(displayName, email, password);
    res.json(mappingData);
  } catch (error) {
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ message: error.response.statusText });
    } else {
      return res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;
