import React from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageIcon from '@mui/icons-material/Language';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';

export default function SettingsSpeedDial(props) {
    const [t, i18n] = useTranslation("global")

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
                icon={<ShareIcon/>}
                tooltipTitle={t("settings-speed-dial.toggle-theme-text")}
                onClick = {props.toggleTheme}
            />

        </SpeedDial>
    )
}