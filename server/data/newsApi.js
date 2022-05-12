const axios = require("axios");

const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("a2ac0345b5e44eb58f870194dc41922b");

async function getNewsByKeyword(KeyWord) {
  //let data = {} ;
  //const data;
  var resultsss = {};

  if (!KeyWord) {
    KeyWord = "crypto";
  }

  if (typeof KeyWord != "string") {
    throw `Invalid tupe of Keyword`;
  }

  let date = new Date();
  let day = date.getDay();
  let month = date.getMonth();
  let year = date.getFullYear();

  console.log(`${year}-${month}-${day}`);

  let dd = `${year}-${month}-${day}`;

  let result = await axios.get(
    `https://newsapi.org/v2/everything?q=${KeyWord}&sortBy=popularity&apiKey=a2ac0345b5e44eb58f870194dc41922b`
  );
  console.log("here", result.data.articles);

  /*const response = await axios.get(
          `https://newsapi.org/v2/everything?q=crypto&sortBy=popularity&apiKey=a2ac0345b5e44eb58f870194dc41922b`
    );
    const json = await response.json();
    console.log("resu;t",json);*/

  /*newsapi.v2.everything({
        sources: 'bbc-news,the-verge',
        q: 'crypto',
        category: 'business',
        language: 'en',
        country: 'us'
      }).then(response => {
        //console.log(response);

        let data = response;
        /*
          {
            status: "ok",
            articles: [...]
          }
        
      });*/

  /*newsapi.v2.everything({
        q: 'bitcoin',
        sources: 'bbc-news,the-verge',
        domains: 'bbc.co.uk, techcrunch.com',
        from: dd,
        to: dd,
        language: 'en',
        sortBy: 'popularity',
        page: 2
      }).then(response => {
          data = response;
        console.log(response);
        /*
          {
            status: "ok",
            articles: [...]
          }
        
      });*/
  //console.log(data);
  return result.data.articles;
}

//getNewsByKeyword();

module.exports = {
  getNewsByKeyword,
};
