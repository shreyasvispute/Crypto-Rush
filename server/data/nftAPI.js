const axios = require("axios");
const validations = require("./validations");
require("dotenv").config();

const NFT_AUTHORIZATION_KEY = process.env.NFT_AUTHORIZATION_KEY;

const NFT_CHAIN_API = process.env.NFT_CHAIN_API;
const NFT_COLLECTION_API = process.env.NFT_COLLECTION_API;

//Returns the all NFT collection chains
async function getNFTChains() {
  const { data } = await axios.get(NFT_CHAIN_API, {
    headers: {
      Authorization: NFT_AUTHORIZATION_KEY,
    },
  });
  if (data.nfts.length > 0) {
    return data.nfts;
  } else {
    throw {
      response: { status: 404, statusText: `No data found.` },
    };
  }
}

//Returns the NFT collection by chain
async function getNFTCollections(chain) {
  validations.validateString(chain, "Chain");

  let collectionURL = NFT_COLLECTION_API.replace("CHAIN", chain);

  const { data } = await axios.get(collectionURL, {
    headers: {
      Authorization: NFT_AUTHORIZATION_KEY,
    },
  });
  if (data.nft) {
    return data.nft;
  } else {
    throw {
      response: { status: 404, statusText: `No data found.` },
    };
  }
}

module.exports = {
  getNFTChains,
  getNFTCollections,
};
