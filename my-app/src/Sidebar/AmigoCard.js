import React from "react";

export default function AmigoCard(props) {
    return (
        <div className="card">
            <p>{props.nombre}</p>
            <hr />
        </div>
    )
}