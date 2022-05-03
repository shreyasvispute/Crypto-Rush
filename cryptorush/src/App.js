import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./App.css";
import { useState } from "react";

import Dashboard from "./Components/Dashboard";
import Cryptocurrencies from "./Components/Cryptocurrencies";
import Exchanges from "./Components/Exchanges";
import NFTs from "./Components/NFTs";
import News from "./Components/News";
import Error from "./Components/Error";
import Blockchain from "./img/blockchain.png";
import NFT from "./Components/NFT";
import Login from "./Components/login/login";
import AuthProvider from "./firebase/Auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="appContainer">
          <header>
            <Navbar bg="light" expand="lg">
              <Container>
                <Navbar.Brand as={Link} to="/">
                  <div className="d-flex">
                    <img
                      src={Blockchain}
                      alt="Crypto-Rush"
                      style={{ height: 50 }}
                    />
                    <div className="icon">Crypto-Rush</div>
                  </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link as={Link} to="/Cryptocurrencies">
                      Cryptocurrencies
                    </Nav.Link>
                    <Nav.Link as={Link} to="/Exchanges">
                      Exchanges
                    </Nav.Link>
                    <Nav.Link as={Link} to="/NFTs">
                      NFTs
                    </Nav.Link>
                    <Nav.Link as={Link} to="/News">
                      News
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </header>
          <div>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />

              <Route path="/Cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/Exchanges" element={<Exchanges />} />
              <Route path="/NFTs" element={<NFTs />} />
              <Route path="/NFT/:id" element={<NFT />} />
              <Route path="/News" element={<News />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
