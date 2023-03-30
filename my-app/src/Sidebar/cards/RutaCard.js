import React from "react";
import { useTranslation } from "react-i18next";
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

export default function RutaCard(route) {
    const [t, i18n] = useTranslation("global")

    console.log(route)
    return (

        <div className="card">
            <hr />
            <h3>{route.name}</h3>
            <p>({route.locations.length})</p>
            <IconButton><EditIcon/></IconButton>
            <IconButton><TravelExploreIcon/></IconButton>
        </div>
    )
}