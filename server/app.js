const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const configRoutes = require("./routes");
const WebSocket = require("ws");
var cors = require("cors");
//to access .env file variables
require("dotenv").config();
app.use(cors());

const PORT = process.env.PORT || 4001; //Server PORT

app.use(express.json());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

configRoutes(app);

//Commented out to stop publishing prices during dev
// https://docs.coincap.io/#37dcec0b-1f7b-4d98-b152-0217a6798058
// const pricesWs = new WebSocket(
//   // "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin"
//   "wss://ws.coincap.io/prices?assets=ALL"
// );

// pricesWs.onmessage = function (msg) {
//   console.log(msg.data);
// };

app.listen(PORT, () => {
  console.log(`Your routes will be running on http://localhost:${PORT}`);
});
