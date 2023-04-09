import React, { useContext, useState } from 'react';
import TabButtons from './TabButtons.js';

export default function DrawerDefaultContent(props) {
    const [contenidoAMostrar, setContenidoAMostrar] = React.useState(null)

    function setNuevoContenidoAMostrar(nuevoContenido) {
        setContenidoAMostrar(nuevoContenido)
    }

    return (
        <>
        <TabButtons
            onClickFunction = {setNuevoContenidoAMostrar}
            userPlaces = {props.userPlaces}
            changeDrawerContent = {props.changeDrawerContent}
            restoreDefautlDrawerContent = {props.restoreDefautlDrawerContent}
            categorias = {props.categorias}
            rutas = {props.rutas}
            centerMapToCoordinates = {props.centerMapToCoordinates}
            API_route_calls = {props.API_route_calls}
        />

        {contenidoAMostrar}
        </>
    )
}