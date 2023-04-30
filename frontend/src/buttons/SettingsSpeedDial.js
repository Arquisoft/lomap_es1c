import React, { useContext } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { useTranslation } from "react-i18next";
import TranslateIcon from '@mui/icons-material/Translate';
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
            icon = {<SettingsIcon data-testid="speed-dial-button" sx={{ m: 0 }}/>}
            direction = 'down'
        >
            {props.changeLanguage
                &&
            <SpeedDialAction
                icon={<TranslateIcon data-testid="change-language-button"/>}
                tooltipTitle={t("settings-speed-dial.change-language-text")}
                onClick = {props.changeLanguage}
            />
            }


            {props.toggleTheme
                &&
            <SpeedDialAction
                icon={currentTheme===Themes.LIGHT ?
                    <LightModeIcon data-testid="change-theme-button-current-light"/> :
                    <DarkModeIcon data-testid="change-theme-button-current-dark"/>
                }
                tooltipTitle={t("settings-speed-dial.toggle-theme-text")}
                onClick = {props.toggleTheme}
                
            />
            }

            {
                props.isLoggedIn
                    &&
                <SpeedDialAction
                    icon={<LogoutIcon data-testid="log-out-button"/>}
                    tooltipTitle={t("sidebar.log-out")}
                    onClick = {props.logOutFunction}
                />
            }
        </SpeedDial>
    )
}