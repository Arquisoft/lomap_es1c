import React from "react";
import AmigoCard from "./cards/AmigoCard";
import { useTranslation } from "react-i18next";

const amigos = [
    {
        id: 1,
        nombre: "David",
        foto: undefined
    },
    {
        id: 2,
        nombre: "Damian",
        foto: undefined
    },
    {
        id: 3,
        nombre: "Miguel",
        foto: undefined
    },
    {
        id: 4,
        nombre: "Ruben",
        foto: undefined
    }
]

export default function AmigosTabContent(props) {
    const [t, i18n] = useTranslation("global")

    const cards = amigos.map(
        amigo =>
        <AmigoCard
            key = {amigo.id}
            {...amigo}
        />
    )

    return (
        <div id="Amigos" className="tabcontent">
            <h1>{t("sidebar.tabs.friend-content.title")}</h1>
            {cards}
        </div>
    )
}