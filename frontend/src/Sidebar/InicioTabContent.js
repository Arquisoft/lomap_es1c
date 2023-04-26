import React, { useContext, useState } from "react";
import PlaceCard from "./cards/PlaceCard";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import { getTextColor, ThemeContext } from "../contexts/ThemeContext";

export default function InicioTabContent(props) {
    const {currentTheme} = useContext(ThemeContext);
    const [t] = useTranslation("global")
    const [searchBarText, setSearchBarText] = useState("")

    return (
        <div className="tabcontent">
            <h1 id="centered">{t("sidebar.tabs.start-content.title")}</h1>
            <div id="centered-content">
                <TextField
                    variant="outlined"
                    placeholder={t("sidebar.tabs.start-content.search-bar-placeholder")}
                    onChange={(e) => (setSearchBarText(e.target.value.toLowerCase()))}
                    InputProps={{
                        style: {color: getTextColor(currentTheme)},
                        "data-testid": "search-bar-1"
                    }}
                    inputProps={{
                        "data-testid": "search-bar-2"
                    }}
                    data-testid= "search-bar-3"
                />
            </div>
            <hr/>

            {props.userPlaces
                .filter(place => place.name.toLowerCase().includes(searchBarText))
                .map(place => <PlaceCard
                    key={place.id}
                    place = {place}
                    changeDrawerContent={props.changeDrawerContent}
                    categorias = {props.categorias}
                    setPosition={props.setPosition}
                    API_location_calls = {props.API_location_calls}
                    isUserPlace = {true}
                    returnTo = {<InicioTabContent {...props} />}
                    userPlaces = {props.userPlaces}
                />)
            }
        </div>
    )
}