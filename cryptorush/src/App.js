import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { useReducer } from "react";
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
import AuthProvider from "./firebase/Auth";
import PrivateRoute from "./Components/PrivateRoutes";
import Navigation from "./Components/Navigation";
import SignUp from "./Components/login/SignUp";
import DashboardContext from "./context/dashboardContext";
import reducer from "./reducers/dashboardReducer";
import Exchange from "./Components/Exchange";

function App() {
  const [dashboard, dashboardDispatch] = useReducer(
    reducer.reducer,
    reducer.initialState
  );
  return (
    <BrowserRouter>
      <AuthProvider>
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
                      {" "}
                      <Exchanges />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/Exchanges/:id"
                  element={
                    <PrivateRoute>
                      {" "}
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
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;