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
  let { id } = useParams();
  if (id === undefined) {
    id = "cryptocurrencies";
  }
  //console.log(id)
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
        <CardGroup>
          <Card style={{ width: "3rem", height: "3rem" }}>
            <Card.Img variant="top" src={data.urlToImage} />
            <Card.Body>
              <Card.Title>{data.title}</Card.Title>
              <Card.Link href={data.url}>Read News</Card.Link>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
    );
  };

  const buildCard1 = (data) => {
    return (
      <div key={data.url} className="col sm-4">
        <Card style={{ width: "16rem" }}>
          <Card.Img variant="top" src={data.urlToImage} />
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <Card.Link href={data.url}>Read News</Card.Link>
          </Card.Body>
        </Card>
      </div>
    );
  };
  let card;
  if (id === "cryptocurrencies") {
    card =
      apiData &&
      apiData.map((characterData) => {
        return buildCard1(characterData);
      });
  } else {
    card =
      apiData &&
      apiData.slice(0, 5).map((characterData) => {
        return buildCard(characterData);
      });
  }

  return (
    <Container>
      <Container className="headRow">
        <CardGroup>{card}</CardGroup>
      </Container>
    </Container>
  );
};
export default NewsScroll;
