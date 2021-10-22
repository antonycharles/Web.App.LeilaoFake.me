import { Button, Stack } from "@mui/material";
import React from "react";
import ILeilao from '../../interfaces/leilao';
import ILink from '../../interfaces/link';
import { useHistory, useLocation } from 'react-router-dom';


function LeilaoShowStack(props: {
    leilao: ILeilao,
    clickButtonDeletarLeilao: (url: string) => void,
    clickButtonExecutaPatch: (url: string, mensagem: string) => void
}) {
    let location = useLocation();
    let history = useHistory();

    const handleClickAlterar = (event: any) => {
        event.stopPropagation();
        history.push(`/leilao/alterar/${props.leilao.id}`, { background: location });
    }

    const handleClickEditarImagem = (event: any) => {
        event.stopPropagation();
        history.push(`/leilao/editar-imagem/${props.leilao.id}`, { background: location });
    }

    return (
        <Stack spacing={2} direction="row" >
            {props.leilao.links.map((item: ILink, index: number) => {
                if (item.rel === "update") {
                    return (
                        <Button
                            key={index}
                            variant="outlined"
                            color="secondary"
                            onClick={handleClickAlterar}
                        >Alterar</Button>);
                }

                if (item.rel === "add_imagens") {
                    return (
                        <Button
                            key={index}
                            variant="outlined"
                            color="secondary"
                            onClick={handleClickEditarImagem}
                        >Editar Imagens</Button>);
                }

                if (item.rel === "delete") {
                    return (
                        <Button
                            key={index}
                            variant="outlined"
                            color="error"
                            onClick={() => props.clickButtonDeletarLeilao(item.href)}
                        >Deletar</Button>);
                }

                if (item.rel === "iniciar_pregao") {
                    return (
                        <Button
                            key={index}
                            variant="outlined"
                            color="success"
                            onClick={() => props.clickButtonExecutaPatch(item.href, 'Leilão alterado com sucesso!')}
                        >Inícia pregão</Button>);
                }

                if (item.rel === "cancelar") {
                    return (
                        <Button
                            key={index}
                            variant="outlined"
                            color="warning"
                            onClick={() => props.clickButtonExecutaPatch(item.href, 'Leilão alterado com sucesso!')}
                        >Cancelar</Button>);
                }

                if (item.rel === "finalizar") {
                    return (
                        <Button
                            key={index}
                            variant="outlined"
                            color="inherit"
                            onClick={() => props.clickButtonExecutaPatch(item.href, 'Leilão finalizado com sucesso!')}
                        >Finalizar</Button>)
                }

                if (item.rel === "tornar_publico") {
                    return (
                        <Button
                            key={index}
                            variant="outlined"
                            color="info"
                            onClick={() => props.clickButtonExecutaPatch(item.href, 'Leilão alterado com sucesso!')}
                        >Tornar público</Button>)
                }
            })}
        </Stack>
    )
}

export default LeilaoShowStack;