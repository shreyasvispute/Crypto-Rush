import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useReducer } from "react";
import "./App.css";

import Dashboard from "./Components/dashboard/Dashboard";
import Cryptocurrencies from "./Components/cryptocurrency/Cryptocurrencies";
import Cryptocurrency from "./Components/cryptocurrency/Cryptocurrency";
import Exchanges from "./Components/Exchanges";
import NFTs from "./Components/nfts/NFTs";
import News from "./Components/News";
import Error from "./Components/Error";
import NFT from "./Components//nfts/NFT";
import Login from "./Components/login/login";
import PrivateRoute from "./Components/PrivateRoutes";
import Navigation from "./Components/Navigation";
import SignUp from "./Components/login/SignUp";
import DashboardContext from "./context/dashboardContext";
import reducer from "./reducers/dashboardReducer";
import Exchange from "./Components/Exchange";
import { UserAuth } from "./firebase/Auth";
import axios from "axios";

function App() {
  const { currentUser, getUserToken } = UserAuth();

  const getStateURL = `/store/getState/USER`;

  let state = [];

  async function fetchStateFromDB() {
    try {
      if (currentUser) {
        let url = getStateURL.replace("USER", currentUser.uid);
        const token = await getUserToken(currentUser);
        const { data } = await axios.get(url, {
          headers: { authorization: `Bearer ${token}` },
        });
        return data;
      } else {
        return undefined;
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        let DBState = await fetchStateFromDB();
        if (DBState) {
          state.push(DBState);
        } else {
          state = reducer.initialState;
        }
      } catch (e) {
        alert(e);
      }
    }
    fetchData();
  }, []);

  const [dashboard, dashboardDispatch] = useReducer(reducer.reducer, state);

  return (
    <BrowserRouter>
      {/* <FetchState> */}
      <DashboardContext.Provider value={{ dashboard, dashboardDispatch }}>
        <div className="appContainer">
          <header>
            <Navigation></Navigation>
          </header>
          <div>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />{" "}
                  </PrivateRoute>
                }
              />
              <Route
                path="/Cryptocurrency"
                element={
                  <PrivateRoute>
                    <Cryptocurrencies />
                  </PrivateRoute>
                }
              />
              <Route
                path="/Cryptocurrency/:symbol"
                element={
                  <PrivateRoute>
                    <Cryptocurrency />
                  </PrivateRoute>
                }
              />

              <Route
                path="/Exchanges"
                element={
                  <PrivateRoute>
                    <Exchanges />
                  </PrivateRoute>
                }
              />
              <Route
                path="/Exchanges/:id"
                element={
                  <PrivateRoute>
                    <Exchange />
                  </PrivateRoute>
                }
              />
              <Route
                path="/NFTs"
                element={
                  <PrivateRoute>
                    <NFTs />
                  </PrivateRoute>
                }
              />
              <Route
                path="/NFT/:id/:tokenId/:chain"
                element={
                  <PrivateRoute>
                    <NFT />
                  </PrivateRoute>
                }
              />
              <Route
                path="/News"
                element={
                  <PrivateRoute>
                    <News />
                  </PrivateRoute>
                }
              />

              <Route
                path="*"
                element={
                  <PrivateRoute>
                    <Error />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
          <footer className="footer text-white">
            <p className="float-end">
              <a className="text-white" variant="light" href="#">
                Back to top
              </a>
            </p>
            <p>©2022 Crypto-Rush. All Rights Reserved.</p>
          </footer>
        </div>
      </DashboardContext.Provider>
      {/* </FetchState> */}
    </BrowserRouter>
  );
}

export default App;
