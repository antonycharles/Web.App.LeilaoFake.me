import { Send } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import AppFormErro from "components/AppFormErro";
import IErroDefault from "interfaces/erro.default";
import React from "react";

function LanceForm(props: {
    btnSubmit: (valor: number) => void,
    errosMensage: IErroDefault,
    setErrosMensage: React.Dispatch<React.SetStateAction<IErroDefault>>,
}) {
    const [lance, setLance] = React.useState("");

    const handleSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();
        event.stopPropagation();

        props.btnSubmit(parseFloat(lance));
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ mt: '30px' }}>
                <AppFormErro erro={props.errosMensage} />
                <TextField
                    id="lanceMinimo"
                    name="lanceMinimo"
                    value={lance}
                    onChange={event => setLance(event.target.value)}
                    label="Qual é o seu lance?"
                    type="number"
                    fullWidth
                    required
                    InputProps={{
                        endAdornment: <Button
                            type="submit"
                            color="success"
                            variant="contained"
                            endIcon={<Send />}
                        >Enviar</Button>
                    }}
                />
            </Box>
        </form>
    );
}

export default LanceForm;