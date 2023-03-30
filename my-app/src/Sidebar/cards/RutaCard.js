import React from "react";
import { useTranslation } from "react-i18next";
import { IconButton } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullRoutePlace from "./FullRouteInfo";

export default function RutaCard(props) {
    const [t, i18n] = useTranslation("global")

    function showFullRouteInfo() {
        props.changeDrawerContent(<FullRoutePlace route={props.route} returnFunction={() => props.changeDrawerContent(null)}/>)
    }

    console.log(props)

    return (

        <div className="card">
            <hr />
            <h3>{props.route.name}</h3>
            <p>Número de lugares: {props.route.locations.length}</p>
            <IconButton><FullscreenIcon onClick={showFullRouteInfo}/></IconButton>
        </div>
    )
}