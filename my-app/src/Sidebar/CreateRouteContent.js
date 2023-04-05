import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function CreateRouteContent(props) {
    function save() {
        console.log("Pendiente de implementar")
        //TODO: pendiente de implementar

        // Llamar a la API para guardar la ruta

        // Actualizar la lista con las rutas
    }


    return (
        <>
        <IconButton onClick={props.returnFunction}><ArrowBackIcon/></IconButton>

        {/* TODO input para el título */}

        {/* Listado de los lugares añadidos */}

        {/* Botón para añadir más lugares */}

        <IconButton onClick={save}><SaveIcon/></IconButton>
        </>
    )
}