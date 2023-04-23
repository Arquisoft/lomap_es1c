import React, { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullFriendInfo from "../../cards/FullFriendInfo";

export default function SeguidoCard(props) {
    const [isVisible, setIsVisible] = useState(false)

    function toggleVisibility() {
        setIsVisible(current => !current)
    }

    function showFullAmigoInfo() {
        // TODO: comprobar si ya tenemos sus lugares
        // TODO: cogerlos si no los tenemos
            
        props.changeDrawerContent(
            <FullFriendInfo
                amigo = {props.friend}
                places = {[]}
                setPosition = {props.setPosition}
                changeDrawerContent = {props.changeDrawerContent}
                returnTo = {props.returnTo}
                API_friend_calls = {props.API_friend_calls}
                API_location_calls = {props.API_location_calls}
            />
        )
        console.log("Pendiente")
    }

    return (
        <>
            {/* Separador */}
            <hr></hr>

            <div className="card--line1">
                {/* Nombre del amigo */}
                <p>{props.friend.name}</p>

                {/* Botón toda la info */}
                <Tooltip
                    title="Ver amigo"
                    placement="bottom"
                >
                    <IconButton
                        onClick={showFullAmigoInfo}
                    >
                        <FullscreenIcon />
                    </IconButton>
                </Tooltip>

                {/* Checkbox para mostrar los puntos en el mapa */}
                <Tooltip
                    title={isVisible ? "Ocultar del mapa" : "Mostrar en el mapa"}
                    placement="bottom"
                >
                    <IconButton
                        onClick = {toggleVisibility}
                    >
                        {isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                </Tooltip>
            </div>
        </>
    )
}