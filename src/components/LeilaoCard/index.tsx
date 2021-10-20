import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ILeilao from 'interfaces/leilao';
import { Button, CardActionArea, CardActions, IconButton } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import { Share } from '@mui/icons-material';

export default function LeilaoCard(props: { leilao: ILeilao }) {
  let location = useLocation();
  let history = useHistory();

  const handleClick = (event: any) => {
    event.stopPropagation();
    history.push(`/leilao/${props.leilao.id}`, { background: location });
  }

  const handleClickCopiar = (url: string) => {
    navigator.clipboard.writeText(url);
  }

  return (
    <Card>
      <CardActionArea onClick={handleClick}>
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
        <IconButton aria-label="share"
          onClick={() => handleClickCopiar(`${window.location.origin}/leilao/${props.leilao.id}`)}>
          <Share />
        </IconButton>
        {props.leilao.isPublico == false &&
          <Button size="small" color="error">Privado</Button>
        }
      </CardActions>
    </Card>
  );
}
