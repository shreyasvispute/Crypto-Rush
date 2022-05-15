const axios = require("axios");
const validations = require("./validations");

// Import coingecko-api
const CoinGecko = require("coingecko-api");
// Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

async function getExchange() {
  // Make calls
  let baseUrl1 =
    "https://api.coingecko.com/api/v3/exchanges?per_page=250&page=1";
  const data1 = await axios.get(baseUrl1);
  let baseUrl2 =
    "https://api.coingecko.com/api/v3/exchanges?per_page=250&page=2";
  const data2 = await axios.get(baseUrl2);
  if (data1.status === 200 && data2.status === 200) {
    let temp = [...data1.data, ...data2.data];
    //console.log(temp.length)
    return temp;
  } else {
    throw {
      response: { status: 404, statusText: `No data found.` },
    };
  }
}

// async function getSearchData(searchTerm){
//   let baseUrl = `https://api.coingecko.com/api/v3/search?query=${searchTerm}`
//   const data = await axios.get(baseUrl)
//   if(data.data.exchanges.length > 0){
//     return data.data.exchanges
//   }else{
//     throw {
//       response: { status: 404, statusText: `No data found.` },
//     }
//   }

// }

async function searchExchange(searchTerm) {
  validations.validateString(searchTerm, "Search Term");
  let ids = [];
  let result = [];

  let mappingData = await getExchange();

  for (let i = 0; i < mappingData.length; i++) {
    if (
      mappingData[i].id.toUpperCase() == searchTerm.toUpperCase() ||
      mappingData[i].name.toLowerCase() == searchTerm.toLowerCase()
    ) {
      result.push(mappingData[i]);
    }
  }

  // for (let i = 0; i < ids.length; i++) {
  //   let id = ids[i];
  //   let quotesURL = CMC_QUOTES_API_URL.replace("ID", id);
  //   const { data } = await axios.get(quotesURL, {
  //     headers: {
  //       "X-CMC_PRO_API_KEY": CMC_API_KEY,
  //     },
  //   });
  //   if (data.status.error_code === 0) {
  //     let cryptoData = data.data;
  //     let metadata = await getCryptoMetadataById(id);
  //     result.push(Object.assign(cryptoData[id], metadata[id]));
  //   } else {
  //     throw {
  //       response: { status: 404, statusText: `No data found.` },
  //     };
  //   }
  // }

  if (result.length > 0) {
    return result;
  } else {
    throw {
      response: { status: 404, statusText: `No data found.` },
    };
  }
}

async function getExchangeList() {
  // Make calls
  let pData = await CoinGeckoClient.ping();
  //console.log(pData)
  let lData = await CoinGeckoClient.exchanges.list();
  //console.log(lData)
  if (lData.code === 200) {
    return lData;
  } else {
    throw {
      response: { status: 404, statusText: `No data found.` },
    };
  }
}

async function getExchangeById(id) {
  validations.validateString(id, "id");
  // Make calls
  let pData = await CoinGeckoClient.ping();
  //console.log(pData)
  let idData = await CoinGeckoClient.exchanges.fetch(id);
  //console.log(idData)
  if (idData.code === 200) {
    return idData;
  } else {
    throw {
      response: { status: 404, statusText: `No data found.` },
    };
  }
}
async function getExchangeVolById(id, days) {
  validations.validateString(id, "id");
  // Make calls
  // let pData = await CoinGeckoClient.ping();
  // let idData = await CoinGeckoClient.exchanges.fetch(id);
  // let idData = await CoinGeckoClient.exchanges.fetchVolumeChart(`${id}`, {
  //         days: days,
  //       });
  let idData = await axios.get(
    `https://api.coingecko.com/api/v3/exchanges/${id}/volume_chart?days=${days}`
  );
  // console.log(idData.data)
  if (idData.status === 200) {
    return idData.data;
  } else {
    throw {
      response: { status: 404, statusText: `No data found.` },
    };
  }
}

async function getTickers(id) {
  validations.validateString(id, "id");
  // Make calls
  let pData = await CoinGeckoClient.ping();
  //console.log(pData)
  let tickerData = await CoinGeckoClient.exchanges.fetchTickers(id);
  //console.log(idData)
  if (tickerData.code === 200) {
    return tickerData;
  } else {
    throw {
      response: { status: 404, statusText: `No data found.` },
    };
  }
}

module.exports = {
  getExchange,
  getExchangeList,
  getExchangeById,
  getTickers,
  searchExchange,
  getExchangeVolById,
};
