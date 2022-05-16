import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";

import Blockchain from "../img/blockchain.png";
import { UserAuth } from "../firebase/Auth";

//Navigation routes file
const Navigation = () => {
  const { currentUser } = UserAuth();
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
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
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/Cryptocurrency">
              Cryptocurrency
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
          <Navbar.Collapse className="justify-content-end">
            <label htmlFor="logoutBtn"></label>
            <Navbar.Text>
              {currentUser.displayName === null
                ? currentUser.email
                : currentUser.displayName}

              <Button variant="light" onClick={handleLogout} id="logoutBtn">
                <BoxArrowRight color="black" size={30} />
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
const NavigationNonAuth = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              SignUp
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigation;
