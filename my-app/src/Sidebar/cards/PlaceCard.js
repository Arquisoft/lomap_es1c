import React from "react";
import Rating from '@mui/material/Rating';
import { IconButton } from '@mui/material';
import FullInfoPlace from "./FullInfoPlace";
import FullscreenIcon from '@mui/icons-material/Fullscreen';

export default function LugarCard(props) {
    const place = props.place

    function showFullInfo() {
        props.changeDrawerContent(<FullInfoPlace place={place} returnFunction={() => props.changeDrawerContent(null)}/>)
    }

    console.log(place)
    const maxTextLength = 20
    return (
        <div className="card">
            <hr />
            <div className="card--line1">
                <h3>{place.name.substring(0, maxTextLength)} {place.name.length>maxTextLength && " ..."}</h3>
                {place.categoria  &&  <p>{place.categoria}</p>}
            </div>
            {place.valoracion ? <Rating value={place.valoracion} readOnly/> : <Rating value={place.valoracion} disabled/>}
            {place.fotos  &&  place.fotos.length>0  &&  <img src={place.fotos[0]}/>}
            <br></br>
            <IconButton onClick={showFullInfo}><FullscreenIcon/></IconButton>
        </div>
    )
}