import React from "react"
import InicioTabContent from './InicioTabContent.js';
import AmigosTabContent from './AmigosTabContent.js';
import RutasTabContent from './RutasTabContent.js';
import DescubrirTabContent from './DescubrirTabContent.js';
import { useTranslation } from "react-i18next";

export default function TabButtons(props) {
    const [t, i18n] = useTranslation("global")
    const inicioTabContent = <InicioTabContent
        userPlaces = {props.userPlaces}
        changeDrawerContent = {props.changeDrawerContent}
        setPosition={props.setPosition}
        categorias = {props.categorias}
        API_location_calls = {props.API_location_calls}
    />
    const amigosTabContent = <AmigosTabContent
        amigos = {props.amigos}
        API_friend_calls = {props.API_friend_calls}
        changeDrawerContent = {props.changeDrawerContent}
        API_location_calls = {props.API_location_calls}
        setPosition = {props.setPosition}
    />
    const rutasTabContent = <RutasTabContent
        userPlaces = {props.userPlaces}
        changeDrawerContent = {props.changeDrawerContent}
        rutas = {props.rutas}
        API_route_calls = {props.API_route_calls}
    />
    const descubrirTabContent = <DescubrirTabContent />

    // By default we display InicioTabContent
    React.useEffect(
        () => {props.onClickFunction(inicioTabContent)},
        []
    )

    return (
        <div className="tablinks">
            <button className="tablink" onClick={(e) => props.onClickFunction(inicioTabContent)}>{t("sidebar.tab-buttons.start")}</button>
            <button className="tablink" onClick={(e) => props.onClickFunction(amigosTabContent)}>{t("sidebar.tab-buttons.friends")}</button>
            <button className="tablink" onClick={(e) => props.onClickFunction(rutasTabContent)}>{t("sidebar.tab-buttons.routes")}</button>
        </div>
    )
}
