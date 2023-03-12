import React from "react";

export default function LugarCard(props) {
    console.log(props)
    
    return (
        <div className="card">
            <div className="card--line1">
                <h3>{props.name}</h3>
                {props.categoria  &&  <p>{props.categoria}</p>}
            </div>
            {props.valoracion  &&  (<p>{props.valoracion}/5</p>)}
            {props.fotos  &&  props.fotos.length>0  &&  <img src={props.fotos[0]}/>}
            <hr />
        </div>
    )
}