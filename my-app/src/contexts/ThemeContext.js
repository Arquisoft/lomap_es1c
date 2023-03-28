import React, {createContext, useState} from "react";

export const ThemeContext = createContext(null);

export const Themes = {
    LIGHT: "light",
    DARK: "dark"
};

export function ThemeContextProvider({children}) {
    const [currentTheme, setCurrentTheme] = useState(Themes.LIGHT);

    const value = {
        currentTheme,
        setCurrentTheme,
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    )
}