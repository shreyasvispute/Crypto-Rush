const express = require("express");
const router = express.Router();
const dataModule = require("../data");
const nftData = dataModule.nftData;
const validations = dataModule.validations;

//Returns the all NFT collection chains
router.get("/chains", async (req, res) => {
  try {
    let collectionsData = await nftData.getNFTChains();
    res.status(200).json(collectionsData);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ message: error.response.statusText });
  }
});

//Returns the NFT collection by chain
router.get("/collection/:chain", async (req, res) => {
  try {
    let chain = req.params.chain;
    validations.validateString(chain, "Chain");
    let collectionData = await nftData.getNFTCollections(chain);
    res.status(200).json(collectionData);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ message: error.response.statusText });
  }
});

module.exports = router;
