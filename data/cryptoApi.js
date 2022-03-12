const axios = require("axios");
require("dotenv").config();

// get the API key and URL from env file
const CRYPTOAPIKEY = process.env.CRYPTOAPIKEY;
const CRYPTOAPIURL = process.env.CRYPTOAPIURL;

const CRYPTOURL = CRYPTOAPIURL + CRYPTOAPIKEY;

//call your respective apis here

module.exports = {};
