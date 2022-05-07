const axios = require("axios");
const Moralis = require("moralis/node");
const validations = require("./validations");
require("dotenv").config();

const { redisClient } = require("../config/redisCLient");

const serverUrl = process.env.NFT_SERVER_URL;
const appId = process.env.NFT_APPLICATION_ID;
const masterKey = process.env.NFT_MASTER_KEY;

//Interplanetary file system objects URL
const ipfsURL = "https://ipfs.io/ipfs/";

//Returns the all NFT search results
async function getAllNFT(keyword, chain) {
  const options = { q: keyword, chain: chain, filter: "name", limit: 20 };

  await Moralis.start({ serverUrl, appId, masterKey });
  const nfts = [];
  const NFTs = await Moralis.Web3API.token.searchNFTs(options);
  if (NFTs.result.length > 0) {
    for (let x of NFTs.result) {
      const nftFromCache = await checkNFTFromCache(x.token_id);
      if (nftFromCache === null) {
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
        // const insertPokemon = await redisClient.hSet(
        //   "nftCache",
        //   x.token_id,
        //   JSON.stringify(NFTResults)
        // );
        nfts.push(NFTResults);
      } else {
        nfts.push(nftFromCache);
      }
    }
    return nfts;
  } else {
    throw {
      response: { status: 404, statusText: `No data found.` },
    };
  }
}

async function checkNFTFromCache(id) {
  const cache = await redisClient.hGet("nftCache", id);
  let pokemonData = JSON.parse(cache);
  return pokemonData;
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

  tokenIdMetadata["tokenPrice"] = tokenPrice;
  // const price = Moralis.Units.ETH(offering.price);
  // const priceHexString = BigInt(price).toString(16);

  // const NFTResults = {
  //   tokenAddress: tokenIdMetadata.token_address,
  //   tokenId: tokenIdMetadata.token_id,
  //   // description: data.description,
  //   // gif_url: data.gif_url?.replace("ipfs://", ipfsURL),
  //   // image: imageURL,
  //   // nftName: data.name,
  // };
  return tokenIdMetadata;
}

const fetchTokenPrice = async (chain, address) => {
  const options = {
    address: address,
    chain: chain,
    days: "3",
  };
  const NFTLowestPrice = await Moralis.Web3API.token.getNFTLowestPrice(options);
  if (NFTLowestPrice) {
    return (
      (NFTLowestPrice.nativePrice.value / price.usdPrice) * Math.pow(10, 10)
    );
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

const getEllipsisTxt = (str, n = 6) => {
  if (str) {
    return `${str.substr(0, n)}...${str.substr(str.length - n, str.length)}`;
  }
  return "";
};

module.exports = {
  getAllNFT,
  getNFT,
};
