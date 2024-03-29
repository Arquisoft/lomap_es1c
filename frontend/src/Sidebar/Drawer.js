import React, { useContext } from 'react';
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
          categorias = {props.categorias}
          rutas = {props.rutas}
          API_route_calls = {props.API_route_calls}
          setPosition={props.setPosition}
          API_location_calls = {props.API_location_calls}
          amigos = {props.amigos}
          API_friend_calls = {props.API_friend_calls}
          solicitudes = {props.solicitudes}
          setFriendsPlaces = {props.setFriendsPlaces}
          friendsPlaces = {props.friendsPlaces}
          getwebId = {props.getwebId}
          addFriendMarkersToMap = {props.addFriendMarkersToMap}
          removeFriendMarkersToMap = {props.removeFriendMarkersToMap}
          visibleFriends = {props.visibleFriends}
          getFriendName = {props.getFriendName}
        />
      )

    return (
        <div id={currentTheme}>
        <IconButton
            sx = {{position: 'absolute', top: 16, left: 16}}
            size="extra"
            onClick={() => props.changeDrawerContent(null)}
            data-testid="change"
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