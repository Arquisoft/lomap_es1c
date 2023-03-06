import React from "react"
import AmigoCard from "./AmigoCard"

const amigos = [
    {
        id: 1,
        nombre: "David",
        foto: undefined
    },
    {
        id: 2,
        nombre: "Damian",
        foto: undefined
    },
    {
        id: 3,
        nombre: "Miguel",
        foto: undefined
    },
    {
        id: 4,
        nombre: "Ruben",
        foto: undefined
    }
]

export default function AmigosTabContent(props) {
    const cards = amigos.map(
        amigo =>
        <AmigoCard
            key = {amigo.id}
            {...amigo}
        />
    )

    return (
        <div id="Amigos" className="tabcontent">
            <h1>El contenido de amigos</h1>
            {cards}
        </div>
    )
}