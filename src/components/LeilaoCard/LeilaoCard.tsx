import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function LeilaoCard(props:{title:string}) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://via.placeholder.com/350X300"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" noWrap>
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
