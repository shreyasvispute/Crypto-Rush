const express = require("express");
const router = express.Router();
const dataModule = require("../data");
const { checkIfAuthenticated } = require("../authMiddleware");
const nftData = dataModule.nftData;
const validations = dataModule.validations;

//Returns the all NFT collection chains
router.get(
  "/search/:keyword/:chain",
  checkIfAuthenticated,
  async (req, res) => {
    const keyword = req.params.keyword;
    const chain = req.params.chain;
    try {
      validations.validateString(keyword, "keyword");
      validations.validateString(chain, "chain");

      let collectionsData = await nftData.getAllNFT(keyword, chain);
      res.status(200).json(collectionsData);
    } catch (error) {
      if (error.response) {
        return res
          .status(error.response.status)
          .json({ message: error.response.statusText });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
);

//Returns the NFT collection by chain
router.get("/:address/:tokenId/:chain", async (req, res) => {
  const { address, tokenId, chain } = req.params;
  try {
    const collectionData = await nftData.getNFT(address, tokenId, chain);
    res.status(200).json(collectionData);
  } catch (error) {
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ message: error.response.statusText });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;
