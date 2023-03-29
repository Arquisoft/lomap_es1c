import './App.css';
import './Sidebar/Sidebar.css';
import Sidebar from "./Sidebar/Sidebar.js";
import CreateMap from './Mapa/Map';
import React, { useState, useEffect, useContext } from 'react';
import CreateModal from './Mapa/PlacesForm';
import { Themes, ThemeContext, ThemeContextProvider } from './contexts/ThemeContext';
import axios from 'axios';
import ToggleThemeButton from './buttons/ToggleThemeButton.js';
import { useTranslation } from "react-i18next";
import ToggleLanguageButton from './buttons/ToggleLanguageButton';

import addPlace from './Places/Places';

var a = [];

export default function App() {

  const [data, setData] = useState('');
  const [t, i18n] = useTranslation("global")

  function getData(){
    axios.get('http://localhost:8080/location')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
      getData();
      for (let i = 0; i < data.length; i++) {
        if(!places.some(value => value.id===data[i].id)){
          addPlace(a[i] = {
            id: data[i].id,
            lat: data[i].latitude,
            lng: data[i].longitude,
            name : data[i].name,
            categoria: data[i].category
          })}
      }

  });

  //Estados de la aplicacion
  //Latitud y longitud del marcador actual que tu pongas en el mapa.
    const [latitude, setLatitude] = React.useState('');
    const [longitude, setLongitude] = React.useState('');
  
    //Constante de el marcador, es donde se guarda el marcador actual para mostrarlo en el mapa.
    const [markers, setMarkers] = React.useState([]);

    //Controla si el boton para añadir marcador a puntos esta activado, este boton saca el popup con el formulario
    const [disabledB,setDisabledB] = React.useState(true);

    //Todos los lugares de la aplicacion
    const [places,setPlaces] = React.useState(a);

    //Constantes del Modal
    const [modalIsOpen, setIsOpen] = React.useState(false);

    //Se puede clickar en el mapa
    const [canCick, setCanCick] = React.useState(false);

    function openModal(boolean){
      setIsOpen(boolean)
    }

    const {currentTheme, setCurrentTheme} = useContext(ThemeContext);
    function toggleTheme() {
      setCurrentTheme((current) => (current===Themes.LIGHT ? Themes.DARK : Themes.LIGHT));
    }
    function toggleLanguage() {
      i18n.changeLanguage(i18n.language === "es" ? "en" : "es");
    }


  return (
    <div id={currentTheme}>
      <Sidebar
        userPlaces = {places}
      />

      <CreateModal
        isOpen={modalIsOpen}
        latMark={latitude}
        lngMark={longitude}
        places={places}
        setIsOpen={setIsOpen}
        setMarkers={setMarkers}
        setStateButton={setDisabledB}
        setCanCick={setCanCick}
      />

      <CreateMap
        open={openModal}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        markers={markers} 
        setMarkers={setMarkers}
        buttonState={disabledB}
        setStateButton={setDisabledB}
        places={places}
        canCick={canCick}
        setCanCick={setCanCick}
      />

      <ToggleThemeButton
        toggleTheme={toggleTheme}
      />

      <ToggleLanguageButton
        toggleFunction={toggleLanguage}
      />
      
    </div>
  );
}
