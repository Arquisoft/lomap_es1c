import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import InicioTabContent from './Sidebar/InicioTabContent.js';
import TabButtons from './Sidebar/TabButtons.js';

export default function (props) {
  const contenidoInicio = <InicioTabContent />
  const [contenidoAMostrar, setContenidoAMostrar] = React.useState(contenidoInicio)

  function setNuevoContenidoAMostrar(nuevoContenido) {
    setContenidoAMostrar(nuevoContenido)
  }
  return (
    <Menu>
      {/* Los botones de las tabs */}
      <TabButtons
        onClickFunction = {setNuevoContenidoAMostrar}
      />

      {/* El contenido que se muestra */}
      {contenidoAMostrar}
    </Menu>
  );
}