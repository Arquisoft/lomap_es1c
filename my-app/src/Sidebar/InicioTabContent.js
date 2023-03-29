import React, { useState } from "react";
import PlaceCard from "./cards/PlaceCard";
import { useTranslation } from "react-i18next";

export default function InicioTabContent(props) {
    const [t, i18n] = useTranslation("global")
    const [searchBarText, setSearchBarText] = useState("")

    return (
        <div id="Inicio" className="tabcontent">
            <h1 id="centered">{t("sidebar.tabs.start-content.title")}</h1>
            <input
                type="search"
                placeholder={t("sidebar.tabs.start-content.search-bar-placeholder")}
                onChange={(e) => (setSearchBarText(e.target.value.toLowerCase()))}
            ></input>
            {props.userPlaces.filter(place => place.name.toLowerCase().includes(searchBarText)).map(place =><PlaceCard key={place.id} {...place}/>)}
        </div>
    )
}