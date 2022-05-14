
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {useParams} from 'react-router-dom'
// import { chartDays } from "../config/data";
import ReactApexChart from "react-apexcharts";
import Tweets from './Tweets';
import Chart from 'chart.js/auto';
import { Card, Container,  CardGroup, Spinner, Row } from "react-bootstrap";
import {Line, Bar,Candlestick} from 'react-chartjs-2'
  console.clear();
  

  const ExchangeInfo= () => {

    const {id} = useParams()

   const [histExchangeData, setHistExchangeData] = useState([]);
   const [days,setDays] = useState(1);
   const [loading, setLoading] = useState(true);
   const [pageError, setPageError] = useState(false);
   const [flag,setflag] = useState(false);

 
   useEffect(() => {

  
    const fetchHistData = async() =>{
      try {

      let data = await axios.get(`/Exchanges/${id}/volume_chart/${days}`)
      
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

  //   let chartData = {
  //     series: [{
  //       name: "Volumne",
  //       data: histExchangeData.map((exch) => exch[1]),
  //   }],
  //   options: {
  //     chart: {
  //       height: 350,
  //       width: "100%",
  //       type: 'line',
  //       zoom: {
  //         enabled: false
  //       },

  //     }
  //   },
  //   dataLabels: {
  //     enabled: true
  //   },
  //   stroke: {
  //     curve: 'straight'
  //   },
  //   title: {
  //     text: `Volumne chart for Past ${days} Days )`,
  //     align: 'center'
  //   },
  //   grid: {
  //     row: {
  //       colors: ['#f3f3f3', 'transparent'], 
  //       opacity: 0.5
  //     },
  //   },
  //   xaxis: {
  //     categories: histExchangeData.map((gdata) =>{
  //       let date = new Date(gdata[0]);
  //       let time =
  //       date.getHours() > 12
  //         ? `${date.getHours() - 12}:${date.getMinutes()}PM`
  //         : `${date.getHours()}:${date.getMinutes()}AM`;
  //        return days === 1 ? time : date.toLocaleDateString();
    
  //   }),
  //   }
  // }
  
  
   
 




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
          <Container className="mainContainer">

          <div >
                {
                  (!histExchangeData | flag===false) ? (
                    <Spinner
                    style={{ color: "gold" }}
                    size={250}
                    thickness={1}
                  />
                  ):(
                   
                   <>
                  <Line data ={graphData} options={{
                     elements: {
                      point: {
                        radius: 1,
                      },
                    },
                  }}/>
                  {/* <ReactApexChart options={chartData.options} series={chartData.series} height={500} width ={750}/> */}
                   
                    <div
                        style={{
                          display: "flex",
                          marginTop: 20,
                          justifyContent: "space-around",
                          width: "100%",
                        }}
            >
              <button style={{
                background:'#084298',
                color:'white'}}
              
              onClick={() => {
                setDays(1);
                         }}> 24 Hours</button>
              <button style={{
                background:'#084298',
                color:'white'}}
              
              onClick={() => {setDays(14);
                  }}> 14 days</button>
              <button style={{
                background:'#084298',
                color:'white'}}
              
              onClick={() => {setDays(30);
                  }}> 30 days</button>
              <button 
                style={{
                  background:'#084298',
                  color:'white'}}
              onClick={() => {setDays(90);
                  }}> 90 days</button>

                  
            </div>
            
                   </>
                   
                   
                  )
                  
                }
               
          </div>
          
   </Container>
        );
      }
    }   
}

export default ExchangeInfo
