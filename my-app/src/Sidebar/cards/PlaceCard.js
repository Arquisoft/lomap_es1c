import React from "react";
import Rating from '@mui/material/Rating';
import { IconButton } from '@mui/material';
import FullInfoPlace from "./FullInfoPlace";
import FullscreenIcon from '@mui/icons-material/Fullscreen';

export default function LugarCard(props) {
    const place = props.place

    function showFullInfo() {
        props.changeDrawerContent(
            <FullInfoPlace
                place={place}
                setPosition={props.setPosition} returnFunction={() => props.changeDrawerContent(null)}
                changeDrawerContent = {props.changeDrawerContent}
                categorias = {props.categorias}
                API_location_calls = {props.API_location_calls}
            />)
    }

    const maxTextLength = 20
    return (
        <div className="card">
            <hr />
            <div className="card--line1">
                <h3>{place.name.substring(0, maxTextLength)} {place.name.length>maxTextLength && " ..."}</h3>
                {place.categoria  &&  <p>{place.categoria}</p>}
            </div>
            {place.valoracion ? <Rating value={place.valoracion} readOnly/> : <Rating value={place.valoracion} disabled/>}
            <br></br>
            <IconButton onClick={showFullInfo}><FullscreenIcon/></IconButton>
        </div>
    )
}