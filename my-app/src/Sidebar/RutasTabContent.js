import React from "react";
import RutaCard from "./cards/RutaCard";
import { useTranslation } from "react-i18next";

export default function RutasTabContent(props) {
    const [t, i18n] = useTranslation("global")
    
    return (
        <div className="tabcontent">
            <h1 id="centered">{t("sidebar.tabs.route-content.title")}</h1>
            {props.rutas.map(
                route =>
                <RutaCard
                    key = {route.id}
                    route = {route}
                    changeDrawerContent = {props.changeDrawerContent}
                    userPlaces = {props.userPlaces}
                    API_route_calls = {props.API_route_calls}
                />
            )}
        </div>
    )
}