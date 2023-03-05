import React from "react";

export default function LugarCard(props) {
    return (
        <div className="card">
            <div className="card--line1">
                <h3>{props.titulo}</h3>
                <p>{props.categoria}</p>
            </div>
            <p>{props.puntuacion}/5</p>
            <hr />
        </div>
    )
}