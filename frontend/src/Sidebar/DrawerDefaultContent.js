import React from 'react';
import { Button } from '@mui/material';
import InicioTabContent from './lugares/LugaresTabContent.js';
import SocialTabContent from './social/SocialTabContent.js';
import RutasTabContent from './rutas/RutasTabContent.js';

export default function DrawerDefaultContent(props) {
    

    return (
        <>
            {/* Título */}
            <h1 id="centered">LoMap_es1C</h1>

            {/* Botón de lugares */}
            {/* TODO: internacionalizar */}
            <Button variant="contained" onClick={async() => {
                const theWebId = await props.getwebId() 
                props.changeDrawerContent(
                    <InicioTabContent
                        userPlaces = {props.userPlaces}
                        changeDrawerContent = {props.changeDrawerContent}
                        setPosition={props.setPosition}
                        categorias = {props.categorias}
                        API_location_calls = {props.API_location_calls}
                        loggedInUserwebId = {theWebId}
                    />
                )
            }}>
                Tus lugares
            </Button>

            <br></br>
            <br></br>

            {/* Botón de social */}
            {/* TODO: internacionalizar */}
            <Button variant="contained" onClick={async() => {
                const theWebId = await props.getwebId();
                props.changeDrawerContent(
                    <SocialTabContent
                        amigos = {props.amigos}
                        API_friend_calls = {props.API_friend_calls}
                        changeDrawerContent = {props.changeDrawerContent}
                        API_location_calls = {props.API_location_calls}
                        setPosition = {props.setPosition}
                        solicitudes = {props.solicitudes}
                        setFriendsPlaces = {props.setFriendsPlaces}
                        friendsPlaces = {props.friendsPlaces}
                        loggedInUserwebId = {theWebId}
                    />
                )
            }}>
                Social
            </Button>

            <br></br>
            <br></br>

            {/* Botón de rutas */}
            {/* TODO: internacionalizar */}
            {/* TODO: pasar el webid del loggedin */}
            <Button variant="contained" onClick={() => props.changeDrawerContent(
                <RutasTabContent
                    userPlaces = {props.userPlaces}
                    changeDrawerContent = {props.changeDrawerContent}
                    rutas = {props.rutas}
                    API_route_calls = {props.API_route_calls}
                    API_location_calls = {props.API_location_calls}
                    setPosition = {props.setPosition}
                />
            )}>
                Rutas
            </Button>
        </>
    )
}