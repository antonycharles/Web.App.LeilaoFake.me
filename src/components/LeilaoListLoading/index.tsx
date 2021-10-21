import React from "react";
import { Grid, Skeleton } from "@mui/material";

export default function LeilaoListLoading() {

    return (
        <Grid container spacing={2} columns={{ xs: 1, sm: 8, md: 12 }} >
            <Grid key={1} item xs={1} sm={4} md={4}>
                <Skeleton variant="rectangular" height={200} />
                <Skeleton height={50} />
                <Skeleton width="60%" />
            </Grid>
            <Grid key={2} item xs={1} sm={4} md={4}>
                <Skeleton variant="rectangular" height={200} />
                <Skeleton height={50} />
                <Skeleton width="60%" />
            </Grid>
            <Grid key={3} item xs={1} sm={4} md={4}>
                <Skeleton variant="rectangular" height={200} />
                <Skeleton height={50} />
                <Skeleton width="60%" />
            </Grid>
        </Grid>
    );
}