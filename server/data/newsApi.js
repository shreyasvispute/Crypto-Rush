const axios = require("axios");

const NewsAPI = require("newsapi");
const validations = require("./validations");
const newsapi = new NewsAPI("a2ac0345b5e44eb58f870194dc41922b");

async function getNews() {
  let q = "Crypto || nft || Blockchain || Ethereum";
  var config = {
    method: "get",
    url: `https://api.newscatcherapi.com/v2/search?q=${q}&search_in=title&countries=US&page_size=50`,
    headers: {
      "x-api-key": "pYnTwM8RzjFVqVMHuWZH8xbz4mNU4e8NoppwV0neUcI",
    },
  };

  let result = await axios(config);
  return result.data.articles;
}

async function getNewsByKeyword(keyword) {
  validations.validateString(keyword, "Keyword");
  if (typeof keyword != "string") {
    throw `Invalid type of Keyword`;
  }
  let q = "(Cryptocurrency && Exchanges) || (nft )";
  // let result = await axios.get(
  //   `https://newsapi.org/v2/everything?q=${KeyWord}&sortBy=popularity&apiKey=a2ac0345b5e44eb58f870194dc41922b`
  // );
  var config = {
    method: "get",
    url: `https://api.newscatcherapi.com/v2/search?q=${keyword}&search_in=summary&countries=US&page_size=10`,
    headers: {
      "x-api-key": "pYnTwM8RzjFVqVMHuWZH8xbz4mNU4e8NoppwV0neUcI",
    },
  };

  let result = await axios(config);
  return result.data.articles;
}

//getNewsByKeyword();

module.exports = {
  getNewsByKeyword,
  getNews,
};
