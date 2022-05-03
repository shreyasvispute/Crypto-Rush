import React from "react";
import { Navigate, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

import Blockchain from "../img/blockchain.png";
import { UserAuth } from "../firebase/Auth";

const Navigation = () => {
  const { currentUser } = UserAuth();
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">
          <div className="d-flex">
            <img src={Blockchain} alt="Crypto-Rush" style={{ height: 50 }} />
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
  );
};
const NavigationNonAuth = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <div className="d-flex">
            <img src={Blockchain} alt="Crypto-Rush" style={{ height: 50 }} />
            <div className="icon">Crypto-Rush</div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/signIn">
              SignUp
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigation;
