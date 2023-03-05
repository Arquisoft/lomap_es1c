import React from "react"

function TabButtons(props) {
    return (
        <div>
            <button className="tablinks" id="defaultOpenButton" onClick={(e) => showTab(e, 'Inicio')}>Inicio</button>
            <button className="tablinks" onClick={(e) => showTab(e, 'Amigos')}>Amigos</button>
            <button className="tablinks" onClick={(e) => showTab(e, 'Rutas')}>Rutas</button>
            <button className="tablinks" onClick={(e) => showTab(e, 'Descubir')}>Descubrir</button>
        </div>
    )
}

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

export {TabButtons, showTab}