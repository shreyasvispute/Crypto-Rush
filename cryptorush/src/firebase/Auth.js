import React, { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";

import { auth } from "./FirebaseConfig";
import {
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  browserSessionPersistence,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const AuthContext = createContext();

//Creates auth context to use it throughout the application
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const createUserAccount = async (username, email, password) => {
    const data = {
      displayName: username,
      email: email,
      password: password,
    };
    const res = await axios.post("login/signup", data);
    return res;
  };

  const GoogleSignIn = async () => {
    // debugger;
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider).catch((e) => {
      console.log(e);
    });
    // if (signInGoogle) {
    //   let user = signInGoogle;

    //   let new_state = {
    //     user: user.uid,
    //     dashboard: {
    //       Cryptocurrency: [],
    //       NFT: [],
    //     },
    //   };
    //   await storeStateToDB(new_state);
    //   return user;
    // }
  };

  const signIn = async (email, password) => {
    await setPersistence(auth, browserSessionPersistence);
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    return await signOut(auth);
  };

  const getUserToken = async (currentUser) => {
    if (currentUser) {
      const token = await currentUser.getIdToken();
      return token;
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoadingUser(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (loadingUser) {
    return (
      <div>
        <h1>Loading....Loading....Loading....Loading....Loading....</h1>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        logout,
        signIn,
        createUserAccount,
        getUserToken,
        GoogleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const UserAuth = () => {
  return useContext(AuthContext);
};
