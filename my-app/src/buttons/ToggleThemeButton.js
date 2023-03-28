import React from "react";

export default function ToggleThemeButton({toggleTheme}) {
    return (
        <button
            onClick={toggleTheme}
            className="toggleThemeButton"
        >
            Cambiar tema
        </button>
    )
}