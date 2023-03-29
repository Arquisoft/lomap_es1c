import React from "react";
import PlaceCard from "./cards/PlaceCard";
import { useTranslation } from "react-i18next";

export default function InicioTabContent(props) {
    const [t, i18n] = useTranslation("global")

    const [cards, setCards] = React.useState(props.userPlaces.map(
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

    return (
        <div id="Inicio" className="tabcontent">
            <h1>{t("sidebar.tabs.start-content.title")}</h1>
            <input
                type="search"
                placeholder={t("sidebar.tabs.start-content.search-bar-placeholder")}
                onChange={textToSearchChange}
            ></input>
            {cards}
        </div>
    )
}