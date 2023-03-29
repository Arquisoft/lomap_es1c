import React from "react";
import RutaCard from "./cards/RutaCard";
import { useTranslation } from "react-i18next";

// TODO: eliminar datos hard-codeados
const rutas = [
    {
        id: 1,
        titulo: "Ruta 1"
    },
    {
        id: 2,
        titulo: "Otra ruta distinta"
    },
]

export default function RutasTabContent(props) {
    const [t, i18n] = useTranslation("global")
    
    const cards = rutas.map(
        ruta =>
        <RutaCard
            key = {ruta.id}
            {...ruta}
        />
    )
    return (
        <div id="Rutas" className="tabcontent">
            <h1>{t("sidebar.tabs.route-content.title")}</h1>
            {cards}
        </div>
    )
}