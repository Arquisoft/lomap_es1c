import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import DeleteIcon from '@mui/icons-material/Delete';
import {useTranslation} from "react-i18next"

export default function FullInfoPlace({place, returnFunction,setPosition}) {
    const [t] = useTranslation("global");
    function allowEdit() {
        // TODO: pendiente de implementar
    }

    function centerMapToPlace() {
        setPosition({
            lat: place.lat,
            lng: place.lng
        });
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

        <Tooltip title={t("sidebar.place.edit")} placement="bottom"><IconButton><EditIcon/></IconButton></Tooltip>
        <Tooltip title={t("sidebar.place.locate")} placement="bottom"><IconButton onClick={centerMapToPlace}><TravelExploreIcon/></IconButton></Tooltip>
        <Tooltip title={t("sidebar.place.delete")} placement="bottom"><IconButton><DeleteIcon/></IconButton></Tooltip>
        </>
    )
}