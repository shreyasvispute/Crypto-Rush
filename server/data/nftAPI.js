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
async function getAllNFT(keyword, chain) {
  validations.validateString(keyword, "keyword");
  validations.validateString(chain, "chain");
  const options = {
    q: keyword,
    chain: chain,
    filter: "name",
    limit: 500,
  };

  await Moralis.start({ serverUrl, appId, masterKey });
  const nfts = [];
  const NFTs = await Moralis.Web3API.token.searchNFTs(options);
  const NFTObject = {
    page: NFTs.page,
    pageSize: NFTs.page_size,
    total: NFTs.total,
  };
  if (NFTs.result.length > 0) {
    for (let x of NFTs.result) {
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
    }

    NFTObject["results"] = nfts;
    return NFTObject;
  } else {
    throw {
      response: { status: 404, statusText: `No data found.` },
    };
  }
}

async function getNFT(address, id, chain) {
  await Moralis.start({ serverUrl, appId, masterKey });

  const options = { address: address, token_id: id, chain: chain };
  const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(
    options
  );
  tokenIdMetadata.metadata = JSON.parse(tokenIdMetadata.metadata);
  const tokenPrice = await fetchTokenPrice(chain, address);
  const trades = await nftTrades(chain, address);
  // const natTokPrice = await nativeTokenPrice(address, chain);
  let price;
  if (tokenPrice) {
    price = await Moralis.Units.FromWei(tokenPrice);
  }

  tokenIdMetadata["tokenPrice"] = price;
  tokenIdMetadata["trades"] = trades.result;

  return tokenIdMetadata;
}

const fetchTokenPrice = async (chain, address) => {
  const options = {
    address: address,
    chain: chain,
    days: "3",
  };
  const NFTLowestPrice = await Moralis.Web3API.token
    .getNFTLowestPrice(options)
    .catch((e) => {
      console.log(e.message);
    });
  if (NFTLowestPrice?.price) {
    return NFTLowestPrice.price;
  } else {
    return null;
  }
};

const nftTrades = async (chain, address) => {
  const options = {
    address: address,
    limit: "10",
    chain: chain,
  };
  const NFTTrades = await Moralis.Web3API.token.getNFTTrades(options);
  return NFTTrades;
};
module.exports = {
  getAllNFT,
  getNFT,
};
