const validations = require("./validations");
const admin = require("../config/firebase");

async function createUser(displayName, email, password) {
  validations.validateString(displayName);
  validations.validateString(email);

  const user = await admin.auth().createUser({
    displayName: displayName,
    email: email,
    password: password,
  });

  if (user) {
    return user;
  }
}

module.exports = { createUser };
