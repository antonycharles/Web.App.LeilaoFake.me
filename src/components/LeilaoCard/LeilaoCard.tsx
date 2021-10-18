import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {ILeilao} from '../../interfaces/leilao';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link, useHistory, useLocation } from 'react-router-dom';

export default function LeilaoCard(props:{leilao:ILeilao}) {
  let location = useLocation();
  let history = useHistory();
  
  const  handleClick = (event:any) => {
    event.stopPropagation();
    history.push(`/leilao/${props.leilao.id}`,{ background: location });
  }
  return (
      <Card onClick={handleClick}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image="https://via.placeholder.com/350X300"
            alt={props.leilao.titulo}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" noWrap>
              {props.leilao.titulo}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link to={`/leilao/${props.leilao.id}`} target="_blank">
            Compartilhar
          </Link>
        </CardActions>
      </Card>
  );
}
