import { Container, Col, Row } from "react-bootstrap";

const myStyles = {
  code: {
    fontSize: 90,
  },
  error: {
    fontSize: 24,
    marginTop: -50,
  },
};

const Error = () => {
  return (
    <div>
      <Container className="mainContainer">
        <Row>
          <Col></Col>
          <Col>
            <p style={myStyles.code}>404</p>
            <p style={myStyles.error}>Page Not Found</p>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Error;
