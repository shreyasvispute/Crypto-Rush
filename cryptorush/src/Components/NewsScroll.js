import { Container, Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewsScroll = () => {
  const [loading, setLoading] = useState(true);
  const [showsData, setShowsData] = useState(undefined);
  const [pageError, setPageError] = useState(false);
  const [apiData, setApiData] = useState([]);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const getData = async () => {
      try {
        const url = `http://localhost:4000/news/${id}`;
        //const token = await getUserToken(currentUser);
        const data = await axios.get(url);

        if (data.data.length === 0) {
          setPageError(true);
        } else {
          setPageError(false);
          setLoading(false);
          setApiData(data.data);
          setShowsData(data.data);
        }
      } catch (error) {
        setPageError(true);
        console.log(error);
      }
    };
    getData();
  }, [id]);

  const buildCard = (data) => {
    return (
      <div key={data.url} className="col sm-4">
        <Row>
          <Col>
            <CardGroup>
              <Card style={{ width: "3rem", height: "3rem" }}>
                <Card.Img variant="top" src={data.urlToImage} />
                <Card.Body>
                  <Card.Title>{data.title}</Card.Title>
                  <Card.Link href={data.url}>Read News</Card.Link>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </div>
    );
  };

  let card;

  card =
    apiData &&
    apiData.slice(0, 5).map((characterData) => {
      return buildCard(characterData);
    });

  return (
    <Container>
      <Container className="headRow">
        <CardGroup>{card}</CardGroup>
      </Container>
    </Container>
  );
};
export default NewsScroll;
