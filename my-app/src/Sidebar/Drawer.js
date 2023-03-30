import React, { useContext, useState } from 'react';
import { Drawer, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeContext } from '../contexts/ThemeContext.js';
import DrawerDefaultContent from './DrawerDefaultContent';


export default function DrawerSidebar(props) {
    const {currentTheme} = useContext(ThemeContext);

    const defaultDrawerContent = (
        <DrawerDefaultContent
          userPlaces={props.userPlaces}
          changeDrawerContent = {props.changeDrawerContent}
          restoreDefautlDrawerContent = {props.restoreDefautlDrawerContent}
        />
      )

    return (
        <div id={currentTheme}>
        <IconButton
            sx = {{position: 'absolute', top: 16, left: 16}}
            size="extra"
            onClick={() => props.setIsDrawerOpen(true)}
        >
            <MenuIcon />
        </IconButton>

        <Drawer
            anchor='left'
            open={props.isDrawerOpen}
            onClose={() => props.setIsDrawerOpen(false)}
            id={currentTheme}
        >
            <Box
                p={2}
                width='300px'
                className="drawer"
            >
                {props.contentToDisplay!=null  &&  props.contentToDisplay}
                {props.contentToDisplay==null  &&  defaultDrawerContent}
            </Box>
        </Drawer>
        </div>
    )
}