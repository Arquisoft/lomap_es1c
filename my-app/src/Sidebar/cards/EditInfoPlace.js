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

    const categoriesToList = ["", ...categorias]
    if (!categoriesToList.includes(place.categoria)) {
      categoriesToList.push(place.categoria)
  }

    return (
        <>
        <IconButton onClick={returnFunction}><ArrowBackIcon/></IconButton>
        <br></br>
        <TextField
          label = "Nombre"
          defaultValue={place.name}
        />

        <Rating value={place.valoracion}/>

        <br></br>
        
        <Select
          defaultValue={place.categoria.toLowerCase()}
          label="Categoria"
        >
          {categoriesToList.map(
            categoria =>
            <MenuItem
              key={categoria.toLowerCase()}
              sx={{height:"35px"}}
              value={categoria.toLowerCase()
            }>
                {categoria==="" ? <em>Sin categoria</em> : categoria}
              </MenuItem>
          )}
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