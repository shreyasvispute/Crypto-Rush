const validations = require("./validations");
const { admin } = require("../config/firebase");
const { db } = require("../config/firebase");
// import { collection, addDoc } from "firebase/firestore";

async function createUser(displayName, email, password) {
  validations.validateString(displayName);
  validations.validateString(email);

  const user = await admin.auth().createUser({
    displayName: displayName,
    email: email,
    password: password,
  });

  if (user) {
    new_state = {
      user: user.uid,
      dashboard: {
        Cryptocurrency: [],
        NFT: [],
      },
    };
    await storeStateToDB(new_state);
    return user;
  }
}

async function storeStateToDB(state) {
  try {
    const new_state = {
      user: state.user,
      dashboard: state.dashboard,
    };
    const res = await db.collection("dashboard").doc(state.user).set(new_state);
    if (res) {
      return true;
    } else {
      return false;
    }
    // console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function updateStateInDB(state) {
  try {
    const updateRef = db.collection("dashboard").doc(state[0].user);

    const res = await updateRef.update({
      dashboard: state[0].dashboard,
    });

    if (res) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

async function fetchStateFromDB(user) {
  try {
    validations.validateString(user);
    const doc = await db.collection("dashboard").doc(user).get();
    if (doc) {
      return doc.data();
    }
    // console.log(doc.id, "=>", doc.data());
  } catch (e) {
    console.error("Error fetching document: ", e);
  }
}

async function deleteStateFromDB(user) {
  try {
    const res = await db.collection("dashboard").doc(user).delete();
    if (res) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
}

module.exports = {
  createUser,
  storeStateToDB,
  fetchStateFromDB,
  updateStateInDB,
  deleteStateFromDB,
};
