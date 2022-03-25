const express = require("express");
const app = express();
const configRoutes = require("./routes");

//to access .env file variables
require("dotenv").config();

//const PORT = process.env.PORT || 3001; //Server PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configRoutes(app);

app.listen(3000, () => {
  console.log(`Your routes will be running on http://localhost:3000`);
});
