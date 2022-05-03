import { Container, Col, Row } from "react-bootstrap";
import "./Components.css";
import { UserAuth } from "../firebase/Auth";

const Dashboard = () => {
  const { currentUser } = UserAuth();
  console.log(currentUser.email);
  return (
    <div>
      <Container className="mainContainer">
        <Row>
          <Col>Dashboard Component</Col>
          <Col>{currentUser.email}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
