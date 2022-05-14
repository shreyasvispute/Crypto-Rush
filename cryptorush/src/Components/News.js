import * as React from 'react';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import {Container, Spinner, Row } from "react-bootstrap";

// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

const News = () => {

  let card = null;
  const [expanded, setExpanded] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState(false);
  const [apiData, setApiData] = useState([]);

  //const {page} = useParams()
  useEffect(() => {
    const getData = async () => {
      try {
        const url = `http://localhost:4000/news`;
        const data = await axios.get(url);

        setApiData(data.data);
        setLoading(false)
        console.log(data.data)

        if (data.data.length === 0) {
          setPageError(true);
        } else {
          setPageError(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (pageError) {
    return (
      <Container>
        <Container className="headRow">
          <Row className="titleAlign">
            <h1>News</h1>
          </Row>
          <Row>
            <h1>Not FOUND</h1>
          </Row>
        </Container>
      </Container>
    );
  } else if (loading) {
      return (
        <div>
          <Container>
            <Spinner animation="border" variant="danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Container>
        </div>
      );
    }
    
  else{return(
      <div>
        {apiData && apiData.map(data=>{
        <Card sx={{ maxWidth: 345 }}>
        
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={data.title}
          subheader={data.publishedAt}
        />
        <CardMedia
          component="img"
          height="194"
          src = {data.urlToImage}
          image={data.urlToImage}
          alt= {data.author}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {data.content}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      })}
    </div>
  )}
}

export default News;
