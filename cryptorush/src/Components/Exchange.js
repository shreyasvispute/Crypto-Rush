// import { Container, Col, Row } from "react-bootstrap";
// import ExchangeInfo from "./ExchangeInfo";
// import {
//   makeStyles,
//   Typography,
//   Link,
//   LinearProgress,
// } from "@material-ui/core";
// //import ReactHtmlParser from 'react-html-parser'
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";

// console.clear();
// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: "flex",
//     [theme.breakpoints.down("md")]: {
//       flexDirection: "column",
//       alignItems: "center",
//     },
//   },
//   sidebar: {
//     width: "30%",
//     [theme.breakpoints.down("md")]: {
//       width: "100%",
//     },
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     marginTop: 25,
//     borderRight: "2px solid grey",
//   },
//   heading: {
//     fontWeight: "bold",
//     marginBottom: 20,
//     fontFamily: "Montserrat",
//   },
//   description: {
//     width: "100%",
//     fontFamily: "Montserrat",
//     padding: 25,
//     paddingBottom: 15,
//     paddingTop: 0,
//     textAlign: "center",
//   },
//   marketData: {
//     alignSelf: "start",
//     padding: 25,
//     paddingTop: 10,
//     width: "100%",
//     [theme.breakpoints.down("md")]: {
//       display: "flex",
//       justifyContent: "space-around",
//     },
//     [theme.breakpoints.down("sm")]: {
//       flexDirection: "column",
//       alignItems: "center",
//       [theme.breakpoints.down("sm")]: {
//         alignItems: "start",
//       },
//     },
//   },
// }));

// function Exchange() {
//   const { id } = useParams();
//   const [exchange, setExchange] = useState();

//   useEffect(() => {
//     const fetchExchange = async () => {
//       const { data } = await axios.get(`/Exchanges/${id}`);
//       // console.log(data)
//       setExchange(data.data);
//     };
//     fetchExchange();
//   }, []);

//   const classes = useStyles();

//   if (!exchange)
//     return (
//       <LinearProgress style={{ backgroundColor: "gold" }}></LinearProgress>
//     );

//   return (
//     <div className={classes.container}>
//       <div className={classes.sidebar}>
//         <img
//           src={exchange?.image}
//           alt={exchange?.name}
//           height="100"
//           style={{ marginBottom: 20 }}
//         />
//         <Typography variant="h3" className={classes.heading}>
//           {exchange && exchange.name ? exchange.name : <p>Not available</p>}
//         </Typography>
//         <Typography variant="subtitle1" className={classes.description}>
//           {exchange && exchange.description ? (
//             exchange.description.split(". ")[0]
//           ) : (
//             <p> Description Not available</p>
//           )}
//           {exchange && exchange.url ? exchange.url : <p>Not available</p>}
//         </Typography>
//         <Typography variant="subtitle1" className={classes.description}>
//           Facebook:
//           {exchange && exchange.facebook_url ? (
//             exchange.facebook_url
//           ) : (
//             <p>Facebook url Not available</p>
//           )}
//         </Typography>
//         <Typography variant="subtitle1" className={classes.description}>
//           Twitter handle:{" "}
//           {exchange && exchange.twitter_handle ? (
//             exchange.twitter_handle
//           ) : (
//             <p>Twitter handle Not available</p>
//           )}
//         </Typography>

//         <div className={classes.marketData}>
//           <span style={{ display: "flex" }}>
//             <Typography variant="h6" className={classes.heading}>
//               Year Established:
//             </Typography>
//             &nbsp;&nbsp;
//             <Typography variant="h6" style={{ fontFamily: "Montserrant" }}>
//               {exchange && exchange.year_established ? (
//                 exchange.year_established
//               ) : (
//                 <p>Not available</p>
//               )}
//             </Typography>
//           </span>

//           <span style={{ display: "flex" }}>
//             <Typography variant="h6" className={classes.heading}>
//               Centralized:
//             </Typography>
//             &nbsp;&nbsp;
//             <Typography variant="h6" style={{ fontFamily: "Montserrant" }}>
//               {exchange && exchange.centralized === true ? (
//                 "True"
//               ) : (
//                 <p>False</p>
//               )}
//             </Typography>
//           </span>

//           <span style={{ display: "flex" }}>
//             <Typography variant="h6" className={classes.heading}>
//               Country:
//             </Typography>
//             &nbsp;&nbsp;
//             <Typography variant="h6" style={{ fontFamily: "Montserrant" }}>
//               {exchange && exchange.country ? (
//                 exchange.country
//               ) : (
//                 <p>Country not availabe</p>
//               )}
//             </Typography>
//           </span>

//           <span style={{ display: "flex" }}>
//             <Typography variant="h6" className={classes.heading}>
//               Trust score:
//             </Typography>
//             &nbsp;&nbsp;
//             <Typography variant="h6" style={{ fontFamily: "Montserrant" }}>
//               {exchange && exchange.trust_score ? (
//                 exchange.trust_score
//               ) : (
//                 <p> Trust score Not available</p>
//               )}
//             </Typography>
//           </span>

//           <span style={{ display: "flex" }}>
//             <Typography variant="h6" className={classes.heading}>
//               Trust score rank:
//             </Typography>
//             &nbsp;&nbsp;
//             <Typography variant="h6" style={{ fontFamily: "Montserrant" }}>
//               {exchange && exchange.trust_score_rank ? (
//                 exchange.trust_score_rank
//               ) : (
//                 <p> Trust score rank Not available</p>
//               )}
//             </Typography>
//           </span>

//           <span style={{ display: "flex" }}>
//             <Typography variant="h6" className={classes.heading}>
//               Trade Vol 24h btc:
//             </Typography>
//             &nbsp;&nbsp;
//             <Typography variant="h6" style={{ fontFamily: "Montserrant" }}>
//               {exchange && exchange.trade_volume_24h_btc ? (
//                 exchange.trade_volume_24h_btc.toFixed(2)
//               ) : (
//                 <p> Trust score rank Not available</p>
//               )}
//             </Typography>
//           </span>
//         </div>
//       </div>
//       <ExchangeInfo exchange={exchange}></ExchangeInfo>
//     </div>
//   );
// }

// export default Exchange;
