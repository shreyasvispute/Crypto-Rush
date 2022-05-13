import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {useParams} from 'react-router-dom'
// import { chartDays } from "../config/data";
import  SelectButton from './SelectButton'
import Chart from 'chart.js/auto';

import {
    CircularProgress,
    createTheme,
    ThemeProvider,
    makeStyles
  } from "@material-ui/core";
import { Card, Container,  CardGroup, Spinner, Row } from "react-bootstrap";
import {Line} from 'react-chartjs-2'
  console.clear();
  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));


  const ExchangeInfo= (exchange) => {

    const {id} = useParams()

   const [histExchangeData, setHistExchangeData] = useState([]);
   const [days,setDays] = useState(1);
   const [loading, setLoading] = useState(true);
   const [pageError, setPageError] = useState(false);
   const [flag,setflag] = useState(false);

 
   useEffect(() => {

  
    const fetchHistData = async() =>{
      try {
        const CoinGecko = require('coingecko-api');
        const CoinGeckoClient = new CoinGecko();
        let data = await CoinGeckoClient.exchanges.fetchVolumeChart(`${id}`, {
          days: days,
        });
       
        setflag(true);
      setHistExchangeData(data.data);

      setLoading(false);

      if (data.data.length === 0) {
        setPageError(true);
      } else {
        setPageError(false);
      }
      
 }
     catch (error) {
      console.log(error);
    }
  }
       fetchHistData()
   }, [days])

 

   console.log(histExchangeData)

   const graphData = 
    {
      labels : histExchangeData.map(  (gdata) =>{
        let date = new Date(gdata[0]);
        let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
         return days === 1 ? time : date.toLocaleDateString();
    
    }),
   datasets :[
 {   data: histExchangeData.map((exch) => exch[1]),
    label: `Volumne chart for Past ${days} Days )`,
    borderColor: "#EEBC1D",
  }
   ],

    
    }
   
   
   const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });




    const classes = useStyles();



    
    if (pageError) {
      return (
        <Container>
          <Container className="headRow">
            <Row className="titleAlign">
              <h1>Exchange</h1>
            </Row>
            <Row>
              <h1>Not FOUND</h1>
            </Row>
          </Container>
        </Container>
      );
    } else {
      if (loading) {
        return (
          <div>
            <Container>
              <Spinner animation="border" variant="danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Container>
          </div>
        );
      } else {
        return (
          <ThemeProvider theme={darkTheme}>
          <div className={classes.container}>
                {
                  (!histExchangeData | flag===false) ? (
                    <CircularProgress
                    style={{ color: "gold" }}
                    size={250}
                    thickness={1}
                  />
                  ) : (
                   
                   <>
                  <Line data ={graphData} options={{
                     elements: {
                      point: {
                        radius: 1,
                      },
                    },
                  }}/>
                   
                    <div
                        style={{
                          display: "flex",
                          marginTop: 20,
                          justifyContent: "space-around",
                          width: "100%",
                        }}
            >
              <button  onClick={() => {
                setDays(1);
                         }}> 24 Hours</button>
              <button  onClick={() => {setDays(14);
                  }}> 14 days</button>
              <button onClick={() => {setDays(30);
                  }}> 30 days</button>
              <button onClick={() => {setDays(90);
                  }}> 90 days</button>
            </div>
                   </>
                   
                   
                  )
                  
                }
                
          </div>
   </ThemeProvider>
        );
      }
    }



   
}

export default ExchangeInfo


