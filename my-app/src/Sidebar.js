/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import InicioTabContent from './Sidebar/InicioTabContent.js';
import TabButtons from './Sidebar/TabButtons.js';

export default function (props) {
  const [contenidoAMostrar, setContenidoAMostrar] = React.useState(null)

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