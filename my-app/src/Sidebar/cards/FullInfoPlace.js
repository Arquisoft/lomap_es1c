import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditInfoPlace from './EditInfoPlace';

export default function FullInfoPlace({place, returnFunction, changeDrawerContent}) {
    function allowEdit() {
        changeDrawerContent(
            <EditInfoPlace
                place = {place}
                changeDrawerContent = {changeDrawerContent}
                returnFunction = {() => changeDrawerContent(this)}
            />
        )
    }

    function centerMapToPlace() {
        // TODO: pendiente de implementar
    }

    function deletePlace() {
        // TODO: pendiente de implementar
    }

    return (
        <>
        <IconButton onClick={returnFunction}><ArrowBackIcon/></IconButton>
        <h1>{place.name}</h1>
        <h3>Categoria:</h3>
        <p>{place.categoria}</p>

        <h3>Comentario:</h3>
        <p></p>

        <h3>Fotos:</h3>
        {/* TODO: añadir listado con todas las fotos */}
        <p></p>

        <IconButton onClick={allowEdit}><EditIcon/></IconButton>
        <IconButton><TravelExploreIcon/></IconButton>
        <IconButton><DeleteIcon/></IconButton>
        </>
    )
}