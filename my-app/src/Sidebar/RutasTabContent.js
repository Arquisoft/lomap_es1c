import React from "react"
import RutaCard from "./RutaCard"

// TODO: eliminar datos hard-codeados
const rutas = [
    {
        id: 1,
        titulo: "Ruta 1"
    },
    {
        id: 2,
        titulo: "Otra ruta distinta"
    },
]

export default function RutasTabContent(props) {
    const cards = rutas.map(
        ruta =>
        <RutaCard
            key = {ruta.id}
            {...ruta}
        />
    )
    return (
        <div id="Rutas" className="tabcontent">
            <h1>El contenido de rutas</h1>
            {cards}
        </div>
    )
}