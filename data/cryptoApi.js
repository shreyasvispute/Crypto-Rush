const axios = require("axios");
const validations = require("./validations");
require("dotenv").config();

const CMC_API_KEY = process.env.CMC_API_KEY;
const CRYPTO_COMPARE_KEY = process.env.CRYPTO_COMPARE_KEY;

const CMC_MAP_API_URL = process.env.CMC_MAP_API_URL;
const CMC_LISTINGS_API_URL = process.env.CMC_LISTINGS_API_URL;
const CMC_QUOTES_API_URL = process.env.CMC_QUOTES_API_URL;
const CRYPTO_COMPARE_HISTORY_URL = process.env.CRYPTO_COMPARE_HISTORY_URL;

//NFT collection API
var config = {
  method: "get",
  url: "https://api.nftport.xyz/v0/nfts?chain=polygon&page_size=50&continuation=&include=default",
  headers: {
    Authorization: "676ea439-d323-44c4-874e-130a69978815",
  },
};

//Individual NFT collection

var config_collection = {
  method: "get",
  url: "https://api.nftport.xyz/v0/nfts/0x0000000000001b84b1cb32787b0d64758d019317/3259539015542658014133428223780909702996875844377967948435992532495689056256?chain=ethereum&refresh_metadata=false",
  headers: {
    Authorization: "676ea439-d323-44c4-874e-130a69978815",
  },
};

//Returns a mapping of all cryptocurrencies to unique CoinMarketCap ids
async function getCryptoMapping() {
  const { data } = await axios.get(CMC_MAP_API_URL, {
    headers: {
      "X-CMC_PRO_API_KEY": CMC_API_KEY,
    },
  });
  if (data.status.error_code === 0) {
    return data.data;
  } else {
    throw {
      response: { status: 404, statusText: `No data found.` },
    };
  }
}

//Returns the latest listings of all cryptocurrencies
async function getCryptoListings() {
  const { data } = await axios.get(CMC_LISTINGS_API_URL, {
    headers: {
      "X-CMC_PRO_API_KEY": CMC_API_KEY,
    },
  });
  if (data.status.error_code === 0) {
    return data.data;
  } else {
    throw {
      response: { status: 404, statusText: `No data found.` },
    };
  }
}

//Returns the latest listing for a cryptocurrency
async function getCryptoQuotes(symbol) {
  validations.validateString(symbol, "Symbol");
  let id;

  let mappingData = await getCryptoMapping();

  for (let i = 0; i < mappingData.length; i++) {
    if (mappingData[i].symbol == symbol.toUpperCase()) {
      id = mappingData[i].id;
      break;
    }
  }

  let quotesURL = CMC_QUOTES_API_URL.replace("ID", id);

  const { data } = await axios.get(quotesURL, {
    headers: {
      "X-CMC_PRO_API_KEY": CMC_API_KEY,
    },
  });
  if (data.status.error_code === 0) {
    return data.data;
  } else {
    throw {
      response: { status: 404, statusText: `No data found.` },
    };
  }
}

//Returns the historical data for a cryptocurrency
async function getCryptoHistory(symbol, days) {
  validations.validateString(symbol, "Symbol");
  validations.validateNumber(Number(days), "Days");

  let historyURL = CRYPTO_COMPARE_HISTORY_URL.replace("SYM", symbol);
  historyURL = historyURL.replace("DAYS", days);

  const { data } = await axios.get(historyURL, {
    headers: {
      authorization: CRYPTO_COMPARE_KEY,
    },
  });
  if (data.Response === "Success") {
    return data.Data.Data;
  } else {
    throw {
      response: { status: 404, statusText: `No data found.` },
    };
  }
}

module.exports = {
  getCryptoMapping,
  getCryptoListings,
  getCryptoQuotes,
  getCryptoHistory,
};
