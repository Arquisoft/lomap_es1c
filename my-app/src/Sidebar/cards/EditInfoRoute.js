import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import { useState } from "react";

export default function EditRouteInfo({route, returnFunction}) {
    const [name, setName] = useState(route == null ? "" : route.name)
    const [locations, setLocations] = useState(route == null ? [] : route.locations)

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
            defaultValue = {name}
        />
        {locations.map(location => (<p key={location.id}>{location.name}</p>))}
        
        <IconButton onClick={save}><SaveIcon/></IconButton>
        </>

    )
}