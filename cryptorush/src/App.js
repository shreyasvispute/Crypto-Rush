import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { useState } from "react";

import Dashboard from "./Components/Dashboard";
import Cryptocurrencies from "./Components/Cryptocurrencies";
import Exchanges from "./Components/Exchanges";
import NFTs from "./Components/nfts/NFTs";
import News from "./Components/News";
import Error from "./Components/Error";
import NFT from "./Components//nfts/NFT";
import Login from "./Components/login/login";
import AuthProvider from "./firebase/Auth";
import PrivateRoute from "./Components/PrivateRoutes";
import Navigation from "./Components/Navigation";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="appContainer">
          <header>
            <Navigation></Navigation>
          </header>
          <div>
            <Routes>
              <Route path="/" element={<Login />} />

              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />{" "}
                  </PrivateRoute>
                }
              />
              <Route
                path="/Cryptocurrencies"
                element={
                  <PrivateRoute>
                    <Cryptocurrencies />
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
                path="/NFTs"
                element={
                  <PrivateRoute>
                    <NFTs />
                  </PrivateRoute>
                }
              />
              <Route
                path="/NFT/:id"
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
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
