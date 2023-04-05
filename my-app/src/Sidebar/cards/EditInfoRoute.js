import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

export default function FullRouteInfo({route, returnFunction}) {
    function save() {
        console.log("Pendiente de implementar")
        // TODO: pendiente de implementar
        // TODO: conectar a la API
    }

    return (
        <>
        <IconButton onClick={returnFunction}><ArrowBackIcon/></IconButton>
        <h1>{route.name}</h1>
        {route.locations.map(location => (<p key={location.id}>{location.name}</p>))}
        
        <IconButton onClick={save}><SaveIcon/></IconButton>
        </>

    )
}