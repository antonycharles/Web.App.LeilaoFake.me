import React from "react";
import { Grid } from "@mui/material";
import LeilaoCard from '../LeilaoCard'
import ILeilaoPaginacao from "interfaces/leilao.paginacao";

export default function LeilaoList(props:{leilaoPaginacao:ILeilaoPaginacao}) {

    return (
        <>
            {props.leilaoPaginacao.resultados.length > 0 &&
                <Grid container spacing={2} columns={{ xs: 1, sm: 8, md: 12 }} >
                    {props.leilaoPaginacao.resultados.map((item:any) => {
                        return (
                            <Grid key={item.id} item xs={1} sm={4} md={4}>
                                <LeilaoCard leilao={item} />
                            </Grid>
                        );
                    })}
                </Grid>
            }
        </>
    );
}