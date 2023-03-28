import React, {useContext} from "react"
import PlaceCard from "./PlaceCard"
import { ThemeContext } from "../contexts/ThemeContext"

export default function InicioTabContent(props) {
    const [cards, setCards] = React.useState(
        props.userPlaces.map(
        place =>
        <PlaceCard
            key={place.id}
            {...place}
        />
    ))
    
    function textToSearchChange(event) {
        setCards(
            props.userPlaces.filter(
                place => place.name.toLowerCase().includes(event.target.value.toLowerCase())
            ).map(
                place =>
                <PlaceCard
                    key={place.id}
                    {...place}
                />
            )
        )
    }

    const {currentTheme} = useContext(ThemeContext)

    return (
        <div id="Inicio" className="tabcontent">
            <h1>Tus lugares</h1>
            <input
                type="text"
                placeholder="Buscar"
                onChange={textToSearchChange}
            ></input>
            {cards}
        </div>
    )
}