import { Alert } from '@mui/material';
import * as React from 'react';

export default function AppFormErro(props: { erro: any }) {
    const getMessage = () => {
        try {
            return props.erro.message;
        } catch {
            return 'erro';
        }
    }

    const getDetails = () => {
        try {
            if(props.erro.details === null || props.erro.details.length === 0)
                return '';

            return (
                <ul>
                {props.erro.details?.map((item: any, index: number) => {
                    return <li key={index}>{item}</li>
                })}
                </ul>
            );
        } catch {
            return '';
        }
    }

    const isErroExiste = () => {
        try {
            return Object.keys(props.erro).length !== 0;
        } catch {
            return false;
        }
    }

    return (
        <>
            {isErroExiste() &&
                <Alert severity="error" sx={{ mb: "15px" }}>
                    {getMessage()}
                    {getDetails()}
                </Alert>
            }

        </>
    )
}