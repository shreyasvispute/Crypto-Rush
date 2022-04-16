import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Dashboard from "./Dashboard";
import Cryptocurrencies from "./Cryptocurrencies";
import Exchanges from "./Exchanges";
import NFTs from "./NFTs";
import News from "./News";
import Error from "./Error";
import Blockchain from "../img/blockchain.png";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
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
            <Route path="/Cryptocurrencies" element={<Cryptocurrencies />} />
            <Route path="/Exchanges" element={<Exchanges />} />
            <Route path="/NFTs" element={<NFTs />} />
            <Route path="/News" element={<News />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
