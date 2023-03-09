import React from "react"
import InicioTabContent from './InicioTabContent.js';
import AmigosTabContent from './AmigosTabContent.js';
import RutasTabContent from './RutasTabContent.js';
import DescubrirTabContent from './DescubrirTabContent.js';

export default function TabButtons(props) {
    const inicioTabContent = <InicioTabContent
        userPlaces = {props.userPlaces}
    />
    const amigosTabContent = <AmigosTabContent />
    const rutasTabContent = <RutasTabContent />
    const descubrirTabContent = <DescubrirTabContent />

    // By default we display InicioTabContent
    React.useEffect(
        () => {props.onClickFunction(inicioTabContent)},
        []
    )

    return (
        <div className="tablinks">
            <button className="tablink" onClick={(e) => props.onClickFunction(inicioTabContent)}>Inicio</button>
            <button className="tablink" onClick={(e) => props.onClickFunction(amigosTabContent)}>Amigos</button>
            <button className="tablink" onClick={(e) => props.onClickFunction(rutasTabContent)}>Rutas</button>
            <button className="tablink" onClick={(e) => props.onClickFunction(descubrirTabContent)}>Descubrir</button>
        </div>
    )
}
