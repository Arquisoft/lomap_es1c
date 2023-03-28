import React from "react";
import { useTranslation } from "react-i18next";

export default function ToggleLanguageButton({toggleFunction}) {
    const [t, i18n] = useTranslation("global")

    return (
        <button
            onClick={toggleFunction}
            className="toggleLanguageButton"
        >
            {i18n.language}
        </button>
    )
}