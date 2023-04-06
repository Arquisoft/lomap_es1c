import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';
import Rating from '@mui/material/Rating';

export default function FullInfoPlace({place, returnFunction, categorias}) {
    function save() {
        console.log("Pendiente de implementar")
        // TODO: pendiente de implementar
        // TODO: conectar a la API
    }

    console.log(categorias)

    return (
        <>
        <IconButton onClick={returnFunction}><ArrowBackIcon/></IconButton>
        <br></br>
        <TextField
          label = "Nombre"
          defaultValue={place.name}
        />

        <Rating value={place.valoracion}/>
        
        <h3>Categoria:</h3>
        <Select
          defaultValue={place.categoria.toLowerCase()}
          name="categoria"
        >
          {["", ...categorias].map(categoria => <MenuItem key={categoria.toLowerCase()} value={categoria.toLowerCase()}>{categoria}</MenuItem>)}
        </Select>

        <br></br>

        <TextField
          label = "Comentario"
        />
        <p></p>

        <h3>Fotos:</h3>
        {/* TODO: añadir listado con todas las fotos */}
        <p></p>

        <IconButton onClick={save}><SaveIcon/></IconButton>

        </>
    )
}