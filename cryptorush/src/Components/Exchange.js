import React, { useEffect, useState } from "react";
import axios from "axios";
import ExchangeInfo from './ExchangeInfo'
import Error from "./Error";
import News from './News'
import {
  Container,
  Col,
  Row,
  Image,
  Spinner,
  Card,
  Tooltip,
  Table,
  CardGroup,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Tweets from "./Tweets";
import "./Components.css";

function Exchange() {

    const {id} = useParams()
    const[exchange,setExchange] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
    

        const fetchExchange = async() => {
          const { data } =  await axios.get(`/Exchanges/${id}`);
          if(data){
              setError(false)
          }
          else{
              setError(true)
          }
          // console.log(data)
          setExchange(data.data);
          setLoading(false)
      };
      fetchExchange();
      }, [id]);
    
    
  if (loading) {
    return (
      <div>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }else{
      return(
          <div className="indContainer">
                {error && <Error />}
            {
                !error && (
                    <Container className="mainContainer">
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Header>
                                        <img
                                           src= {exchange?.image}
                                           alt={exchange?.name}
                                           className="navbar-brand cryptoLogo"
                                        />{" "}
                                        {exchange.name}
                                    </Card.Header>
                                    <Container>
                                       <ExchangeInfo exchange={exchange.name}></ExchangeInfo>
                                    </Container>
                                        <Card.Body>
                                            <Card.Title>
                                            {exchange && exchange.name ? exchange.name : <p>Not available</p>}
                                            </Card.Title>
                                            <Card.Text className="charDesc">
                                            {exchange && exchange.description ? exchange.description.split('. ')[0] : <p> Description Not available</p>}
                                            {exchange && exchange.url ? exchange.url : <p>Not available</p>}
                                            </Card.Text>
                                            <Card.Text className="charDesc">
                                                Facebook:{exchange && exchange.facebook_url ? exchange.facebook_url : <p>Facebook url Not available</p>}
                                            </Card.Text>
                                            <Card.Text className="charDesc">
                                                Twitter handle: {exchange && exchange.twitter_handle ? exchange.twitter_handle : <p>Twitter handle Not available</p>}
                                            </Card.Text>
                                            <Card.Text className="charDesc">
                                                Year Established: {exchange && exchange.year_established ? exchange.year_established : <p>Not available</p>}
                                            </Card.Text>
                                            <Card.Text className="charDesc">
                                              centralized:{exchange && exchange.centralized === true ? 'True' : <p>False</p>}
                                            </Card.Text>
                                            <Card.Text className="charDesc">
                                              Trust score rank :{exchange && exchange.trust_score_rank ? exchange.trust_score_rank : <p> Trust score rank Not available</p>}
                                            </Card.Text>
                                            <Card.Text className="charDesc">
                                            Trade Volumne 24 hour:{exchange && exchange.trade_volume_24h_btc ? exchange.trade_volume_24h_btc.toFixed(2) : <p> Trust score rank Not available</p>}
                                            </Card.Text>
                                            <Card.Text className="charDesc">
                                             Trust score:{exchange && exchange.trust_score ? exchange.trust_score : <p> Trust score Not available</p>}
                                            </Card.Text>
                                            
                                
                                        
                                        
                                        </Card.Body>
                                        
                                </Card>
                            </Col>
                        </Row>
                        <Card.Body>
                          <Container>
                            <Row><News exchange={exchange.name}></News></Row>
                          </Container>  
                        </Card.Body>
                        
                        <Container>
                          <Row><Tweets exchange={exchange.name}></Tweets></Row>
                        </Container>
                    </Container>
                    
                )
            }
          </div>
      )
  }
 

}

export default Exchange
