import React, { useContext, useState } from "react";
import PlaceCard from "./cards/PlaceCard";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import { getTextColor, ThemeContext } from "../contexts/ThemeContext";

export default function InicioTabContent(props) {
    const {currentTheme} = useContext(ThemeContext);
    const [t, i18n] = useTranslation("global")
    const [searchBarText, setSearchBarText] = useState("")

    return (
        <div id="Inicio" className="tabcontent">
            <h1 id="centered">{t("sidebar.tabs.start-content.title")}</h1>
            <div id="centered-content">
                <TextField
                    variant="outlined"
                    placeholder={t("sidebar.tabs.start-content.search-bar-placeholder")}
                    onChange={(e) => (setSearchBarText(e.target.value.toLowerCase()))}
                    InputProps={{style: {color: getTextColor(currentTheme)}}}
                />
                
            </div>
            {props.userPlaces.filter(place => place.name.toLowerCase().includes(searchBarText)).map(place =><PlaceCard key={place.id} {...place}/>)}
        </div>
    )
}