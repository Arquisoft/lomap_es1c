import React, { useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import InicioTabContent from './Sidebar/InicioTabContent.js';
import AmigosTabContent from './Sidebar/AmigosTabContent.js';
import RutasTabContent from './Sidebar/RutasTabContent.js';
import DescubrirTabContent from './Sidebar/DescubrirTabContent.js';
import {TabButtons, showTab} from './Sidebar/TabButtons.js';

export default props => {
    useEffect(() => {
        // Show the "Inicio" tab and add the "active" class to the "Inicio" button
        showTab(null, 'Inicio');
        document.getElementById('defaultOpenButton').classList.add('active');
    }, []);

  return (
    <Menu>
        {/* añadir los botones de las tabs */}
        <TabButtons />
      

    {/* Añadir el contenido de las tabs */}
      <InicioTabContent />
      <AmigosTabContent />
      <RutasTabContent />
      <DescubrirTabContent />
    </Menu>
  );
};

