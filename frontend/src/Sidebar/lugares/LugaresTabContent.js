import React, { useContext, useState } from "react";
import PlaceCard from "../lugares/PlaceCard";
import { useTranslation } from "react-i18next";
import { IconButton, TextField, Tooltip } from "@mui/material";
import { getTextColor, ThemeContext } from "../../contexts/ThemeContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function InicioTabContent(props) {
    const {currentTheme} = useContext(ThemeContext);
    const [t] = useTranslation("global")
    const [searchBarText, setSearchBarText] = useState("")
    const [disableComponents, setDisableComponents] = useState(false)

    return (
        <div className="tabcontent">
            <Tooltip title={t("sidebar.back-arrow-text")} placement="bottom" disabled = {disableComponents}>
                <IconButton onClick={() => props.changeDrawerContent(props.returnTo)}>
                    <ArrowBackIcon data-testid="arrow"/>
                </IconButton>
            </Tooltip>


            <h1 id="centered">{t("sidebar.tabs.start-content.title")}</h1>
            <div id="centered-content">
                <TextField
                    variant="outlined"
                    placeholder={t("sidebar.tabs.start-content.search-bar-placeholder")}
                    onChange={(e) => (setSearchBarText(e.target.value.toLowerCase()))}
                    InputProps={{ style: {color: getTextColor(currentTheme)}, }}
                    disabled = {disableComponents}
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
                    returnTo = {<InicioTabContent {...props} />}
                    loggedInUserwebId = {props.loggedInUserwebId}
                    disableComponents = {disableComponents}
                    setDisableComponents = {setDisableComponents}
                    getFriendName = {props.getFriendName}
                />)
            }
        </div>
    )
}