const firebaseApp = require("../config/firebase");
const { getAuth } = require("firebase/auth");
const { createUserWithEmailAndPassword } = require("firebase/auth");
const { getDatabase, ref, set, onValue } = require("firebase/database");

async function saveUserData(userId, name, email) {
  const database = getDatabase(firebaseApp);

  await set(ref(database, "users/" + userId), {
    username: name,
    email: email,
  });
}

async function createUser(email, password) {
  const auth = getAuth();
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  ).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
  const user = userCredential.user;
  return user;
}

module.exports = {
  createUser,
  saveUserData,
};
