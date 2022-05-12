import { Container, Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardGroup } from "react-bootstrap";
import Search from "./Search";
//import {useSelector,useDispatch} from 'react-redux';

/*import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    maxWidth: 250,
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 5,
    border: '1px solid #1e8678',
    boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
  },
  titleHead: {
    borderBottom: '1px solid #1e8678',
    fontWeight: 'bold'
  },
  grid: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  media: {
    height: '100%',
    width: '100%'
  },
  button: {
    color: '#1e8678',
    fontWeight: 'bold',
    fontSize: 12
  }
});*/


const News = () => {

  //const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [showsData, setShowsData] = useState(undefined);
  //const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  const [pageError, setPageError] = useState(false);
  const [apiData, setApiData] = useState([]);


  useEffect(() => {
    const getData = async () => {
      try {
        let limit = 20;
        // let page = Number(params.page);
        // if (isNaN(page)) {
        //   setPageError(true);
        //   return;
        // }
        // if (page === 0) {
        //   setPrevState(false);
        //   page = 0;
        // } else {
        //   setPrevState(true);
        // }

        // page += 1;
        // let offset = limit * page - limit;
        const url = `http://localhost:4000/news`;
        //const token = await getUserToken(currentUser);
        const data = await axios.get(url);
        console.log("data",data.data);



        // let totalPages = Math.ceil(totalRecords / limit) - 1;
        // setPages(totalPages);

        // if (page - 1 === totalPages) {
        //   setNextState(false);
        // } else {
        //   setNextState(true);
        // }
        //setApiData(data.data);
        //setLoading(false);

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
  }, []);

  useEffect(() => {
    async function searchNFTs(searchTerm) {
      try {
        setPageError(false);

        const url = `http://localhost:4000/news/${searchTerm}`;
        const data = await axios.get(url);
        // setTotalRecords(data.length);
        setLoading(false);
        setSearchData(data.data);
      } catch (error) {
        setPageError(true);
        console.log(error);
      }
    }
    if (searchTerm) {
      // setPaginate(false);
      searchNFTs(searchTerm);
    }
  }, [searchTerm]);

  const searchValue = async (value) => {
    setSearchTerm(value);
  };

  const buildCard = (data) => {
    return (
      <div key={data.author} className="col sm-4">
        <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src = {data.urlToImage}  />
  <Card.Body>
    <Card.Title>{data.title}</Card.Title>
    <Card.Text>
      {data.content}
    </Card.Text>
  </Card.Body>
  <Card.Body>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card>
      </div>
    );
  };

  let card;

  if (searchTerm) {
   card =
      searchData &&
      searchData.map((characters) => {
        return buildCard(characters);
      });
  } else {
   card =
      apiData &&
      apiData.map((characterData) => {
        return buildCard(characterData);
      });
  }

  return(
    <Container>
          <Container className="headRow">
            <Row className="titleAlign">
              <h1>NEWS</h1>
            </Row>

            <Row>
            <Col>
              <Search page="NFTs" searchValue={searchValue}></Search>
            </Col>
      
              {/* <Col sm className="makeCenter filterMargin">
                {paginate && (
                  <Paginate
                    pageNum={params.page}
                    prevState={isPrev}
                    nextState={isNext}
                    page="characters"
                    currentPage={
                      Number(params.page) < 0 ? 0 : Number(params.page)
                    }
                    totalPages={pages}
                  ></Paginate>
                )}
              </Col> */}
              {/* <Col sm className="makeCenter filterMargin">
                Total Records Count: {totalRecords}
              </Col> */}
            </Row>
          </Container>
          <CardGroup>{card}</CardGroup>
        </Container>
  )

};

export default News;
