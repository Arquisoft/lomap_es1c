import React, { useState } from 'react';
import { Drawer, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TabButtons from './TabButtons.js';

export default function DrawerSidebar(props) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [contenidoAMostrar, setContenidoAMostrar] = React.useState(null)

    function setNuevoContenidoAMostrar(nuevoContenido) {
        setContenidoAMostrar(nuevoContenido)
      }

    return (
        <>
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
        >
            <Box
                p={2}
                width='250px'
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
        </>
    )
}