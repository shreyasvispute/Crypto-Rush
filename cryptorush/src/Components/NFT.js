import { Container, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const NFT = () => {
  let params = useParams();

  return (
    <div>
      <Container className="mainContainer">
        <Row>
          <Col>{params.id}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default NFT;
