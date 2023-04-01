import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import DeleteIcon from '@mui/icons-material/Delete';

export default function FullRouteInfo({route, returnFunction}) {
    return (
        <>
        <IconButton onClick={returnFunction}><ArrowBackIcon/></IconButton>
        <h1>{route.name}</h1>
        {route.locations.map(location => (<p key={location.id}>{location.name}</p>))}
        <IconButton><EditIcon/></IconButton>
        <IconButton><TravelExploreIcon/></IconButton>
        <IconButton><DeleteIcon/></IconButton>
        </>
    )
}