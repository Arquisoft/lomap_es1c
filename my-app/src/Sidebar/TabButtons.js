import React from "react"
import InicioTabContent from '../Sidebar/InicioTabContent.js';
import AmigosTabContent from '../Sidebar/AmigosTabContent.js';
import RutasTabContent from '../Sidebar/RutasTabContent.js';
import DescubrirTabContent from '../Sidebar/DescubrirTabContent.js';

export default function TabButtons(props) {
    return (
        <div className="tablinks">
            <button className="tablink" onClick={(e) => props.onClickFunction(<InicioTabContent />)}>Inicio</button>
            <button className="tablink" onClick={(e) => props.onClickFunction(<AmigosTabContent />)}>Amigos</button>
            <button className="tablink" onClick={(e) => props.onClickFunction(<RutasTabContent />)}>Rutas</button>
            <button className="tablink" onClick={(e) => props.onClickFunction(<DescubrirTabContent />)}>Descubrir</button>
        </div>
    )
}
