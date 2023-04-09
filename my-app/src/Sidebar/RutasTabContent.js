import React, { useEffect, useState } from "react";
import RutaCard from "./cards/RutaCard";
import { useTranslation } from "react-i18next";
import axios from 'axios';

export default function RutasTabContent(props) {
    // const [routes, setRoutes] = useState([])

    // function updateRoutes(theRoutes) {
    //     setRoutes(
    //         theRoutes.map(
    //             route => ({
    //                 id: route.id,
    //                 name: route.name,
    //                 locations: 
    //                     route.locations.map(
    //                         location => ({
    //                             id: location.id,
    //                             name: location.name,
    //                             latitude: location.latitude,
    //                             longitude: location.longitude
    //                         })
    //                     )
    //             })
    //         )
    //     )
    // }

    // useEffect(() => {getRoutes();}, [])

    // function getRoutes() {
    //     axios
    //         .get('http://localhost:8080/route')
    //         .then(response => updateRoutes(response.data))
    //         .catch(error => {console.log(error)});
    // }

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
                />
            )}
        </div>
    )
}