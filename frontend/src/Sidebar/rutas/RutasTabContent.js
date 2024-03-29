import React from "react";
import RutaCard from "./RutaCard";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Tooltip } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditRouteInfo from "./EditInfoRoute";

export default function RutasTabContent(props) {
    const [t, i18n] = useTranslation("global")

    function handleClickOnNewRoute() {
        props.changeDrawerContent(
            <EditRouteInfo
                route = {null}
                changeDrawerContent = {props.changeDrawerContent}
                returnTo = {<RutasTabContent {...props} />}
                userPlaces = {props.userPlaces}
                API_route_calls = {props.API_route_calls}
            />
        )
    }

    return (
        <div className="tabcontent">
            <Tooltip title={t("sidebar.back-arrow-text")} placement="bottom">
                <IconButton onClick={() => props.changeDrawerContent(props.returnTo ? props.returnTo : null)} data-testid="arrow">
                    <ArrowBackIcon />
                </IconButton>

            </Tooltip>

            <div className="card--line1">
                <h1
                    id="centered"
                    data-testid="routes_title"
                >
                    {t("sidebar.tabs.route-content.title")}
                </h1>

                <Tooltip title={t("locations.createRoute")}>
                    <IconButton onClick={handleClickOnNewRoute} data-testid="creteRoute">
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Tooltip>
            </div>
            
            {props.rutas.map(
                route =>
                <RutaCard
                    key = {route.id}
                    route = {route}
                    changeDrawerContent = {props.changeDrawerContent}
                    userPlaces = {props.userPlaces}
                    API_route_calls = {props.API_route_calls}
                    API_location_calls = {props.API_location_calls}
                    setPosition = {props.setPosition}
                    categorias = {props.categorias}
                    loggedInUserwebId = {props.loggedInUserwebId}
                    returnTo = {<RutasTabContent {...props} />}
                    getFriendName = {props.getFriendName}
                />
            )}
        </div>
    )
}