const Twit = require("twit");
require("dotenv").config();
const validations = require("./validations");

const Twitter_client = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
});

function getAlltweets(keyword) {
  return new Promise((resolve, reject) => {
    validations.validateString(keyword, "Seacrch keyword");
    if (keyword) {
      Twitter_client.get(
        "search/tweets",
        { q: `#${keyword} since:2021-12-15`, count: 10 },
        function (err, data, response) {
          const tweets = data.statuses;
          return resolve(tweets);
        }
      );
    } else {
      Twitter_client.get(
        "search/tweets",
        { q: `#crypto since:2021-12-15`, count: 10 },
        function (err, data, response) {
          const tweets = data.statuses;
          return resolve(tweets);
        }
      );
    }
  });
}

module.exports = { getAlltweets };
