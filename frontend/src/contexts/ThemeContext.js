import React, {createContext, useState} from "react";

export const ThemeContext = createContext(null);

export const Themes = {
    LIGHT: "light",
    DARK: "dark"
};

export function getTextColor(isLightTheme) {
    return isLightTheme===Themes.LIGHT ? "#3f3f3f" : "#ebecf0";
}

export function getBackgroundColor(isLightTheme) {
    return isLightTheme===Themes.LIGHT ? "#ebecf0" : "#3f3f3f";
}

export function ThemeContextProvider({children}) {
    const [currentTheme, setCurrentTheme] = useState(
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ?     // if true, then dark is preferred
        Themes.DARK : Themes.LIGHT
    );

    const value = {
        currentTheme,
        setCurrentTheme,
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    )
}