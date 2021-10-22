import React, { useEffect } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useHistory, useParams } from "react-router-dom";
import { leilaoService } from 'services/leilao.service'
import { leilaoImagemService } from 'services/leilao.imagem.service'
import IErroDefault from 'interfaces/erro.default';
import ILeilao from 'interfaces/leilao';
import ILink from 'interfaces/link';
import { useSnackbar } from 'notistack';
import ILeilaoImagem from 'interfaces/leilao.imagem';
import CustomImageList from './components/CustomImageList';
import { CloudUpload } from '@mui/icons-material';

function EditarImagem() {
  const [leilao, setLeilao] = React.useState({} as ILeilao);
  const [erroMessage, setErroMessage] = React.useState({} as IErroDefault)

  let { leilao_id } = useParams<{ leilao_id: string }>();
  const { enqueueSnackbar } = useSnackbar();

  let history = useHistory();

  useEffect(() => {
    leilaoService.getLeilaoId(leilao_id)
      .then((dados: ILeilao) => {
        if (leilao?.id !== leilao_id)
          setLeilao(dados)
      }).catch((erros: IErroDefault) => {
        history.push('/404');
      });
  }, [leilao_id]);

  const handleClose = (event: React.FormEvent<EventTarget>) => {
    event.stopPropagation();
    history.goBack();
  };

  const getUrlAlterar = (): ILink => {
    return leilao.links.find(x => x.rel === 'add_imagens') as ILink;
  }

  const changeHandler = (event: any) => {
    const arquivo: File = event.target.files[0];
    const link = getUrlAlterar();

    leilaoImagemService.incluir(link.href, leilao.id, arquivo)
      .then((resultado: ILeilaoImagem) => {
        setErroMessage({} as IErroDefault)
        let alteracaoLeilao = leilao;
        alteracaoLeilao.leilaoImagens.push(resultado);
        setLeilao(alteracaoLeilao);
      })
      .catch((erros: IErroDefault) => {
        setErroMessage(erros)
      })

  };

  const handleButtonDeleteclick = (id: number, url: string) => {
    leilaoImagemService.deletar(url)
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

  const Input = styled('input')({
    display: 'none',
  });


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
              <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={changeHandler} />
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
