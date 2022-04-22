// const { firebase, auth } = require("../config/firebase");

// async function createUser(email, password) {
//   const userCredential = await firebase
//     .auth()
//     .createUserWithEmailAndPassword(auth, email, password)
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorCode, errorMessage);
//     });
//   return userCredential;
// }

// async function signIn(email, password) {
//   const userCredential = await firebase
//     .auth()
//     .signInWithEmailAndPassword(auth, email, password)
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorCode, errorMessage);
//     });
//   const user = userCredential.user;
//   return user;
// }

// module.exports = {
//   createUser,
//   signIn,
// };
const validations = require("./validations");
const admin = require("../config/firebase");

async function createUser(email, password) {
  validations.validateString(email);
  validations.validateString(password);
  const user = await admin.auth().createUser({
    email,
    password,
  });

  if (user) {
    return user;
  }
}

module.exports = { createUser };
