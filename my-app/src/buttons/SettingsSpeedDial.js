import React, { useContext } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Themes, ThemeContext } from '../contexts/ThemeContext';
import LogoutIcon from '@mui/icons-material/Logout';

export default function SettingsSpeedDial(props) {
    const [t] = useTranslation("global")
    const {currentTheme} = useContext(ThemeContext)

    return (
        <SpeedDial
            ariaLabel="Settings speed dial"
            sx = {{position: 'absolute', top: 16, right: 16}}
            icon = {<SettingsIcon sx={{ m: 0 }}/>}
            direction = 'down'
        >
            <SpeedDialAction
                icon={<LanguageIcon/>}
                tooltipTitle={t("settings-speed-dial.change-language-text")}
                onClick = {props.changeLanguage}
            />
            <SpeedDialAction
                icon={currentTheme===Themes.LIGHT ? <LightModeIcon /> : <DarkModeIcon />}
                tooltipTitle={t("settings-speed-dial.toggle-theme-text")}
                onClick = {props.toggleTheme}
            />
            <SpeedDialAction
                icon={<LogoutIcon />}
                tooltipTitle={t("sidebar.log-out")}
                onClick = {props.logOutFunction}
            />

        </SpeedDial>
    )
}