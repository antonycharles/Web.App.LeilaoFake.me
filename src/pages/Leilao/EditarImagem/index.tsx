import React, { useEffect } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, Input } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import IErroDefault from 'interfaces/erro.default';
import ILeilao from 'interfaces/leilao';
import ILink from 'interfaces/link';
import { useSnackbar } from 'notistack';
import ILeilaoImagem from 'interfaces/leilao.imagem';
import CustomImageList from './components/CustomImageList';
import { CloudUpload } from '@mui/icons-material';
import ServicesContext from 'contexts/ServicesContext';

function EditarImagem() {
  const [leilao, setLeilao] = React.useState({} as ILeilao);

  let { leilao_id } = useParams<{ leilao_id: string }>();
  const { enqueueSnackbar } = useSnackbar();

  let history = useHistory();
  const servicesContext = React.useContext(ServicesContext);

  useEffect(() => {
    servicesContext.leilaoService.getLeilaoId(leilao_id)
      .then((dados: ILeilao) => {
        if (leilao.id !== leilao_id)
          setLeilao(dados)
      }).catch((erros: IErroDefault) => {
        history.push('/404');
      });
  }, [leilao_id]);

  const handleClose = (event: React.FormEvent<EventTarget>) => {
    event.stopPropagation();
    history.goBack();
  };

  const handleButtonIncluir = (event: any) => {
    const arquivo: File = event.target.files[0];
    const link = leilao.links.find(x => x.rel === 'add_imagens') as ILink;

    servicesContext.leilaoImagemService.incluir(link.href, leilao.id, arquivo)
      .then((resultado: ILeilaoImagem) => {
        let alteracaoLeilao = leilao;
        alteracaoLeilao.leilaoImagens.push(resultado);
        setLeilao(alteracaoLeilao);
      })
      .catch((erros: IErroDefault) => {
        console.log(erros)
      })
  };

  const handleButtonDeleteclick = (id: number, url: string) => {
    servicesContext.leilaoImagemService.deletar(url)
      .then(response => {
        enqueueSnackbar(response, { variant: "success" });

        const index = leilao.leilaoImagens.findIndex(x => x.id === id);
        let alteracaoLeilao = leilao;
        alteracaoLeilao.leilaoImagens.splice(index, 1);

        setLeilao(alteracaoLeilao)
      })
      .catch((erro: IErroDefault) => {
        enqueueSnackbar(erro.message, {
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          }, variant: "error"
        });
      });
  }


  return (
    <div>
      <Dialog open={true} onClose={handleClose} fullWidth={true} maxWidth="md">
        <DialogTitle>Editar Imagens</DialogTitle>
        <DialogContent>
          <p>Leilão: {leilao.titulo}</p>
          <CustomImageList
            leilao={leilao}
            buttonDeleteclick={handleButtonDeleteclick}
          />
          <Box>
            <label htmlFor="contained-button-file">
              <Input type="file" inputProps={{ accept: 'image/*' }} sx={{display:'none'}} id="contained-button-file"  onChange={handleButtonIncluir} />
              <Button variant="contained" component="span" fullWidth={true}>
                <CloudUpload sx={{mr:'10px'}}/> Enviar imagem
              </Button>
            </label>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditarImagem;
