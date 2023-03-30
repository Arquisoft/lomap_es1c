import React, { useContext, useState } from 'react';
import { Drawer, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import TabButtons from './TabButtons.js';
import { ThemeContext } from '../contexts/ThemeContext.js';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from "react-i18next";

export default function DrawerSidebar(props) {
    const {currentTheme} = useContext(ThemeContext);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [contenidoAMostrar, setContenidoAMostrar] = React.useState(null)
    const [t, i18n] = useTranslation("global")

    function setNuevoContenidoAMostrar(nuevoContenido) {
        setContenidoAMostrar(nuevoContenido)
      }

    return (
        <div id={currentTheme}>
        <IconButton
            sx = {{position: 'absolute', top: 16, left: 16}}
            size="extra"
            onClick={() => setIsDrawerOpen(true)}
        >
            <MenuIcon />
        </IconButton>

        <Drawer
            anchor='left'
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            id={currentTheme}
        >
            <Box
                p={2}
                width='300px'
                height='100%'
                className="drawer"
            >
                <TabButtons
                    onClickFunction = {setNuevoContenidoAMostrar}
                    userPlaces = {props.userPlaces}
                />

                {contenidoAMostrar}
            </Box>

            <Button
                variant="outlined"
                startIcon={<LogoutIcon/>}
                onClick = {props.logOutFunction}
            >
                {t("sidebar.log-out")}
            </Button>

        </Drawer>
        </div>
    )
}