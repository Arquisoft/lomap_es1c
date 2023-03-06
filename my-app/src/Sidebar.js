import React, { useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';

function Props(){
    useEffect(() => {
        // Show the "Inicio" tab and add the "active" class to the "Inicio" button
        showTab(null, 'Inicio');
        document.getElementById('defaultOpenButton').classList.add('active');
    }, []);

  return (
    <Menu>
        {/* añadir los botones de las tabs */}
      <div>
      <button className="tablinks" id="defaultOpenButton" onClick={(e) => showTab(e, 'Inicio')}>Inicio</button>
      <button className="tablinks" onClick={(e) => showTab(e, 'Amigos')}>Amigos</button>
      <button className="tablinks" onClick={(e) => showTab(e, 'Rutas')}>Rutas</button>
      <button className="tablinks" onClick={(e) => showTab(e, 'Descubir')}>Descubrir</button>
      </div>


    {/* Añadir el contenido de las tabs */}
      <div id="Inicio" className="tabcontent">
      <h1>El contenido de inicio</h1>
      <p>El contenido de inicio</p>
      </div>

      <div id="Amigos" className="tabcontent">
      <h1>El contenido de amigos</h1>
      <p>El contenido de amigos</p>
      <p>El contenido de amigos</p>
      <p>El contenido de amigos</p>
      </div>

      <div id="Rutas" className="tabcontent">
      <h1>El contenido de rutas</h1>
        <ol>
        <li>Ruta 1</li>
        <li>Ruta 2</li>
        <li>Ruta 3</li>
        </ol>
      </div>

      <div id="Descubir" className="tabcontent">
      <h1>El contenido de descubrir</h1>
      <p>El contenido de descubrir</p>
      <p>El contenido de descubrir</p>
      <p>El contenido de descubrir</p>
      </div>
    </Menu>
  );
};

export default Props;

function showTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        if (tablinks[i]) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    var tab = document.getElementById(tabName);
    if (tab) {
      tab.style.display = "block";
    }
    if (evt)
        evt.currentTarget.className += " active";
  };