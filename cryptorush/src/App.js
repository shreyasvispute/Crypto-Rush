import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Dashboard from "./Components/Dashboard";
import Cryptocurrencies from "./Components/Cryptocurrencies";
import Cryptocurrency from "./Components/Cryptocurrency";
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
                path="/Cryptocurreny/:symbol"
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
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
