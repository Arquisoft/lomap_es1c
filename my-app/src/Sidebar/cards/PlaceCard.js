import React from "react";
import Rating from '@mui/material/Rating';

export default function LugarCard(props) {
    return (
        <div className="card">
            <hr />
            <div className="card--line1">
                <h2>{props.name}</h2>
                {props.categoria  &&  <p>{props.categoria}</p>}
            </div>
            {props.valoracion ? <Rating value={props.valoracion} readOnly/> : <Rating value={props.valoracion} disabled/>}
            {props.fotos  &&  props.fotos.length>0  &&  <img src={props.fotos[0]}/>}
        </div>
    )
}