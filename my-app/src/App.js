import './App.css';
import './Sidebar/Sidebar.css';
import CreateMap from './Mapa/Map';
import React, { useState, useEffect, useContext } from 'react';
import CreateModal from './Mapa/PlacesForm';
import { Themes, ThemeContext } from './contexts/ThemeContext';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import SettingsSpeedDial from './buttons/SettingsSpeedDial';
import DrawerSidebar from './Sidebar/Drawer';
import addPlace from './Places/Places';

var a = [];

export default function App({logOutFunction}) {

  const [data, setData] = useState('');
  const [t, i18n] = useTranslation("global")
  const [categorias, setCategorias] = useState([])
  const [rutas, setRutas] = useState([])

  function getData(){
    axios.get('http://localhost:8080/location')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function updateCategorias() {
    axios.get('http://localhost:8080/location/categories')
    .then(response => {setCategorias(response.data);})
    .catch(error => {console.log(error);});
  }

  function updateRutas() {
    axios.get('http://localhost:8080/route')
      .then(response => 
        setRutas(
          response.data.map(
            ruta => ({
              id: ruta.id,
              name: ruta.name,
              locations: ruta.locations.map(
                location => ({
                  id: location.id,
                  name: location.name,
                  latitude: location.latitude,
                  longitude: location.longitude
                })
              )
            })
          )
        ))
        .catch(error => {console.log(error)});
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

  useEffect(() => {
    updateCategorias()
  }, [])

  useEffect(() => {
    updateRutas()
  }, [])

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

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

  function restoreDefautlDrawerContent() {
    setDrawerContent(null)
  }

  function changeDrawerContent(newContent=null) {
    setIsDrawerOpen(true)
    setDrawerContent(newContent)
  }

  // // TODO: borrar si ya lo hizo Damian
  function centerMapToCoordinates(newLatitude, newLongitude) {
  //   // TODO: comprobar por qué
  //   console.log("Center no funciona")
  //   setLatitude(newLatitude)
  //   setLongitude(newLongitude)
  }

  return (
    <div id={currentTheme}>
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
        changeDrawerContent={changeDrawerContent}
        restoreDefautlDrawerContent={restoreDefautlDrawerContent}
        categorias = {categorias}
      />

      <SettingsSpeedDial
        changeLanguage = {toggleLanguage}
        toggleTheme = {toggleTheme}
        logOutFunction = {logOutFunction}
      />

      <DrawerSidebar
        userPlaces = {places}
        isDrawerOpen = {isDrawerOpen}
        setIsDrawerOpen = {setIsDrawerOpen}
        contentToDisplay = {drawerContent}
        restoreDefautlDrawerContent = {restoreDefautlDrawerContent}
        changeDrawerContent = {changeDrawerContent}
        categorias = {categorias}
        rutas = {rutas}
        centerMapToCoordinates={centerMapToCoordinates}
      />

    </div>
  );
}
