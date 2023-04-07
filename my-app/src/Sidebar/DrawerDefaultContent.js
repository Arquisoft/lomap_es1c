import React from 'react';
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
            setPosition={props.setPosition}
        />

        {contenidoAMostrar}
        </>
    )
}