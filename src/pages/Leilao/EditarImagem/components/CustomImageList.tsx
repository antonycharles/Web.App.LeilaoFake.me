import React from "react";
import ILeilao from 'interfaces/leilao';
import ILink from 'interfaces/link';
import ILeilaoImagem from 'interfaces/leilao.imagem';
import { Button, ImageList, ImageListItem } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";

function CustomImageList(props: {
    leilao: ILeilao,
    buttonDeleteclick(id: number, url: string): void
}) {

    const getUrlDeletar = (leilaoImagem: ILeilaoImagem): ILink => {
        return leilaoImagem.links.find(x => x.rel === 'delete') as ILink;
    }

    return (
        <>
            {props.leilao.leilaoImagens?.length > 0 &&
                <ImageList sx={{ height: 450 }} cols={4}>
                    {props.leilao.leilaoImagens.map(itemImagem => (
                        <ImageListItem key={itemImagem.id}>
                            <img
                                src={`${itemImagem.links.find(f => f.rel === "self")?.href}`}
                                alt={props.leilao.titulo + ' ' + itemImagem.id}
                                loading="lazy"
                            />
                            <Button variant="outlined" color="error" onClick={() => props.buttonDeleteclick(itemImagem.id, getUrlDeletar(itemImagem).href)}>
                                <DeleteOutline /> Deletar
                            </Button>
                        </ImageListItem>
                    ))}
                </ImageList>
            }
        </>
    );
}

export default CustomImageList;