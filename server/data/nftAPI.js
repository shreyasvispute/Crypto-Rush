const axios = require("axios");
const Moralis = require("moralis/node");
const validations = require("./validations");
require("dotenv").config();

const serverUrl = process.env.NFT_SERVER_URL;
const appId = process.env.NFT_APPLICATION_ID;
const masterKey = process.env.NFT_MASTER_KEY;

//Interplanetary file system objects URL
const ipfsURL = "https://ipfs.io/ipfs/";

//Returns the all NFT search results
async function getNFTSearchData(keyword, chain) {
  const options = { q: keyword, chain: chain, filter: "name", limit: 30 };

  await Moralis.start({ serverUrl, appId, masterKey });
  const nfts = [];
  const NFTs = await Moralis.Web3API.token.searchNFTs(options);

  if (NFTs.result.length > 0) {
    NFTs.result.forEach((x) => {
      const data = JSON.parse(x.metadata);
      let imageURL = "";
      if (data.image?.includes("ipfs://ipfs")) {
        imageURL = data.image.replace("ipfs://ipfs", ipfsURL);
      } else if (data.image?.includes("ipfs://")) {
        imageURL = data.image.replace("ipfs://", ipfsURL);
      } else {
        imageURL = data.image;
      }
      const NFTResults = {
        tokenAddress: x.token_address,
        tokenId: x.token_id,
        description: data.description,
        gif_url: data.gif_url?.replace("ipfs://", ipfsURL),
        image: imageURL,
        nftName: data.name,
      };
      nfts.push(NFTResults);
    });
    console.log(nfts);
    return nfts;
  } else {
    throw {
      response: { status: 404, statusText: `No data found.` },
    };
  }
}

module.exports = {
  getNFTSearchData,
};
