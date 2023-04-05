import React, { useEffect } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';


export default function FullInfoPlace({place, returnFunction}) {
    const [categorias, setCategorias] = React.useState([]);

    function getCategories(){
        axios.get('http://localhost:8080/location/categories')
        .then(response => {setCategorias(response.data);})
        .catch(error => {console.log(error);});
    }

    useEffect(() => {
        getCategories();
        // TODO comprobar si de verdad hace falta
        if (place.categoria != ""  &&  categorias.includes(place.categoria)) {
            setCategorias(current => [...current, place.categoria])
        }
    });

    function save() {
        console.log("Pendiente de implementar")
        // TODO: pendiente de implementar
        // TODO: conectar a la API
    }

    return (
        <>
        <IconButton onClick={returnFunction}><ArrowBackIcon/></IconButton>
        <br></br>
        <TextField
            defaultValue={place.name}
        />
        <h3>Categoria:</h3>
        <Select
          defaultValue={place.categoria.toLowerCase()}
          name="categoria"
        >
          {categorias.map(categoria => <MenuItem value={categoria.toLowerCase()}>{categoria}</MenuItem>)}
        </Select>

        <h3>Comentario:</h3>
        <p></p>

        <h3>Fotos:</h3>
        {/* TODO: añadir listado con todas las fotos */}
        <p></p>

        <IconButton onClick={save}><SaveIcon/></IconButton>

        </>
    )
}