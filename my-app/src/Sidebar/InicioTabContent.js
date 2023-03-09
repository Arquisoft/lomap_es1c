import React from "react"
import PlaceCard from "./PlaceCard"

export default function InicioTabContent(props) {
    const cards = props.userPlaces.map(
        place =>
        <PlaceCard
            key={place.id}
            {...place}
        />
    )

    return (
        <div id="Inicio" className="tabcontent">
            <h1>El contenido de inicio</h1>
            {cards}
        </div>
    )
}