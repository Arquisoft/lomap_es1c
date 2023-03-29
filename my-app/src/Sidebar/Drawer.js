import React, { useContext, useState } from 'react';
import { Drawer, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TabButtons from './TabButtons.js';
import { ThemeContext } from '../contexts/ThemeContext.js';

export default function DrawerSidebar(props) {
    const {currentTheme, setCurrentTheme} = useContext(ThemeContext);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [contenidoAMostrar, setContenidoAMostrar] = React.useState(null)

    function setNuevoContenidoAMostrar(nuevoContenido) {
        setContenidoAMostrar(nuevoContenido)
      }

    return (
        <div id={currentTheme}>
        <IconButton
            sx = {{position: 'absolute', top: 16, left: 16}}
            size="extra"
        >
            <MenuIcon
                onClick={() => setIsDrawerOpen(true)}
            />
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
                {/* Los botones de las tabs */}
                <TabButtons
                    onClickFunction = {setNuevoContenidoAMostrar}
                    userPlaces = {props.userPlaces}
                />

                {/* El contenido que se muestra */}
                {contenidoAMostrar}
            </Box>
        </Drawer>
        </div>
    )
}