import React from "react"
import LugarCard from "./LugarCard"

// TODO: eliminar datos hard-codeados
const lugares = [
    {  
        id: 1,
        titulo: "Ayto",
        coor: (10, 10),
        puntuacion: 4.9,
        comentarios: [],
        fotos: [],
        categoria: "Monumento"
    },
    {
        id:2,
        titulo: "Niemeyer",
        coor: (10, 10),
        puntuacion: 4.9,
        comentarios: ["Un sitio bien chulo"],
        fotos: [],
        categoria: "Monumento"
    },
    { 
        id: 3,
        titulo: "Parque",
        coor: (150, 10),
        puntuacion: 3.0,
        comentarios: ["Solo un parque", "¿Qué más puedes pedir?"],
        fotos: [],
        categoria: "Parque"
    }
  ]

export default function InicioTabContent(props) {
    const cards = lugares.map(
        lugar =>
        <LugarCard
            key={lugar.id}
            {...lugar}
        />
    )

    return (
        <div id="Inicio" className="tabcontent">
            <h1>El contenido de inicio</h1>
            {cards}
        </div>
    )
}