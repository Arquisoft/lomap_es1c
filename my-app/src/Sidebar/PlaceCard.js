import React from "react";

export default function LugarCard(props) {
    return (
        <div className="card">
            <div className="card--line1">
                <h3>{props.titulo}</h3>
                <p>{props.categoria}</p>
            </div>
            {props.puntuacion  &&  (<p>{props.puntuacion}/5</p>)}
            {props.fotos  &&  props.fotos.length>0  &&  <img src={props.fotos[0]}/>}
        </div>
    )
}