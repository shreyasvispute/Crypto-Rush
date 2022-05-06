const axios = require("axios");
const validations = require("./validations");
require("dotenv").config();

const CMC_API_KEY = process.env.CMC_API_KEY;
const CRYPTO_COMPARE_KEY = process.env.CRYPTO_COMPARE_KEY;

const CMC_MAP_API_URL = process.env.CMC_MAP_API_URL;
const CMC_LISTINGS_API_URL = process.env.CMC_LISTINGS_API_URL;
const CMC_QUOTES_API_URL = process.env.CMC_QUOTES_API_URL;
const CRYPTO_COMPARE_HISTORY_URL = process.env.CRYPTO_COMPARE_HISTORY_URL;
const CMC_METADATA_API_URL_ID = process.env.CMC_METADATA_API_URL_ID;
const CMC_METADATA_API_URL_LIST = process.env.CMC_METADATA_API_URL_LIST;

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
  let result = [];
  let csvList = "";
  const { data } = await axios.get(CMC_LISTINGS_API_URL, {
    headers: {
      "X-CMC_PRO_API_KEY": CMC_API_KEY,
    },
  });
  if (data.status.error_code === 0) {
    let cryptoData = data.data;
    cryptoData.forEach((element) => {
      if (csvList === "") {
        csvList = element.slug;
      } else {
        csvList = csvList + "," + element.slug;
      }
    });
    let metadata = await getCryptoMetadataByList(csvList);

    let metadataArr = Object.values(metadata);

    for (let i = 0; i < cryptoData.length; i++) {
      result.push({
        ...cryptoData[i],
        ...metadataArr.find((innerItem) => innerItem.id === cryptoData[i].id),
      });
    }
    return result;
  } else {
    throw {
      response: { status: 404, statusText: `No data found.` },
    };
  }
}

//Returns the latest listing for a cryptocurrency
async function getCryptoMetadataById(Id) {
  validations.validateNumber(Id, "ID");

  let metadataURL = CMC_METADATA_API_URL_ID.replace("ID", Id);

  const { data } = await axios.get(metadataURL, {
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
async function getCryptoMetadataByList(csvList) {
  validations.validateString(csvList, "Comma-separated List");

  let metadataURL = CMC_METADATA_API_URL_LIST.replace("LIST", csvList);

  const { data } = await axios.get(metadataURL, {
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
  let result = {};

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
    let cryptoData = data.data;
    let metadata = await getCryptoMetadataById(id);
    mergedObj = { ...cryptoData, ...metadata };
    result = Object.entries(mergedObj);
    return result[0][1];
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
