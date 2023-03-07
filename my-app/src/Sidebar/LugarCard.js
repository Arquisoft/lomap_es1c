import React from "react";

export default function LugarCard(props) {
    let ruta_img = "./"
    if (props.fotos.length > 0) {
        ruta_img += props.fotos.length[0]
    } else {
        ruta_img += "no_image.png"
    }

    return (
        <div className="card">
            <div className="card--line1">
                <h3>{props.titulo}</h3>
                <p>{props.categoria}</p>
            </div>
            <p>{props.puntuacion}/5</p>
            <img src={ruta_img}/>
        </div>
    )
}