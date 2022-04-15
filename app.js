const express = require("express");
const app = express();
const configRoutes = require("./routes");
const WebSocket = require("ws");

//to access .env file variables
require("dotenv").config();

//const PORT = process.env.PORT || 3001; //Server PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configRoutes(app);

// https://docs.coincap.io/#37dcec0b-1f7b-4d98-b152-0217a6798058
const pricesWs = new WebSocket(
  // "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin"
  "wss://ws.coincap.io/prices?assets=ALL"
);

pricesWs.onmessage = function (msg) {
  console.log(msg.data);
};

app.listen(3000, () => {
  console.log(`Your routes will be running on http://localhost:3000`);
});
