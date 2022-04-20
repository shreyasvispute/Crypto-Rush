import axios from "axios";
import { auth } from "./firebaseConfig";

const createUserAccount = async (data) => {
  return await axios.post("/signin", data);
};

const loginUser = async (email, password) => {
  return await auth().signInWithEmailAndPassword(email, password);
};

export { createUserAccount, loginUser };
