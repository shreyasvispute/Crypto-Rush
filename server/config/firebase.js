const admin = require("firebase-admin");
const keys = require("../cryptorush-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(keys),
  databaseURL: "https://cryptorush-6aa31-default-rtdb.firebaseio.com",
});

module.exports = admin;
