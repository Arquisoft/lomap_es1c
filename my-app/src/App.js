import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import CreateMap from "./Mapa/Map";
import CreateModal from "./Mapa/PlacesForm";
import addPlace from "./Places/Places";
import DrawerSidebar from "./Sidebar/Drawer";
import "./Sidebar/Sidebar.css";
import SettingsSpeedDial from "./buttons/SettingsSpeedDial";
import { ThemeContext, Themes } from "./contexts/ThemeContext";

var a = [];

export default function App({ logOutFunction }) {
  //Todos los lugares de la aplicacion
  const [places,setPlaces] = React.useState(a);

  const [data, setData] = useState('');
  const [t, i18n] = useTranslation("global")
  const [categorias, setCategorias] = useState([])
  const [rutas, setRutas] = useState([])

  function updateCategorias() {
    axios.get('http://localhost:8080/location/categories')
    .then(response => {setCategorias(response.data);})
    .catch(error => {console.log(error);});
  }

  function updateRutas() {
    //TODO código actualizar con la nueva llamada a la API
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
		async function getData() {
			await axios
				.get("http://localhost:8080/location", { withCredentials: true })
				.then((response) => {
					if (response.data.length !== data.length) {
						setData(response.data);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
		getData();
		for (let i = 0; i < data.length; i++) {
			if (!places.some((value) => value.id === data[i].id)) {
				addPlace(
					(a[i] = {
						id: data[i].id,
						lat: data[i].latitude,
						lng: data[i].longitude,
						name: data[i].name,
						categoria: data[i].category,
					})
				);
			}
		}
		setPlaces(a);
	}, [setData, data, places]);

  useEffect(() => {
    updateCategorias()
  }, [])

  useEffect(() => {
    updateRutas()
  }, [])

  function API_getAllRoutes() {
    //TODO:
    console.log("get all pendiente")
  }

  function API_getRouteByID(routeID) {
    //TODO
    console.log("get by id pendiente")
  }

  function API_addRoute(routeName, routeDescription) {
    // TODO
    console.log("add pendiente")
    updateRutas()
  }

  function API_updateRouteInfo(routeID, newRouteName, newRouteDescription) {
    // TODO
    console.log("update pendiente")
    updateRutas()
  }

  function API_deleteRoute(routeID) {
    //TODO
    console.log("delete pendiente")
    updateRutas()
  }

  function API_addLocationToRoute(routeID, locationID) {
    //TODO
    console.log("add location pendiente")
    updateRutas()
  }

  function API_deleteLocationFromRoute(routeID, locationID) {
    //TODO
    console.log("delete location pendiente")
    updateRutas()
  }
  function API_changeOrderOfLocationInRoute(routeID, locationID, newPosition) {
    //TODO
    console.log("change order pendiente")
    updateRutas()
  }

  const API_route_calls = {
    "API_getAllRoutes": API_getAllRoutes,
    "API_getRouteByID": API_getRouteByID,
    "API_addRoute": API_addRoute,
    "API_updateRouteInfo": API_updateRouteInfo,
    "API_deleteRoute": API_deleteRoute,
    "API_addLocationToRoute": API_addLocationToRoute,
    "API_deleteLocationFromRoute": API_deleteLocationFromRoute,
    "API_changeOrderOfLocationInRoute": API_changeOrderOfLocationInRoute
  }

  //Estados de la aplicacion
  //Latitud y longitud del marcador actual que tu pongas en el mapa.
    const [latitude, setLatitude] = React.useState('');
    const [longitude, setLongitude] = React.useState('');
  
    //Constante de el marcador, es donde se guarda el marcador actual para mostrarlo en el mapa.
    const [markers, setMarkers] = React.useState([]);

    //Controla si el boton para añadir marcador a puntos esta activado, este boton saca el popup con el formulario
    const [disabledB,setDisabledB] = React.useState(true);

    

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

  	//Constante de el centro de el mapa cuando se carga, si la geolocalización no falla deberia ser la unicación del usuario.
	const [position, setPosition] = useState({
		lat: 0,
		lng: 0,
	});

  return (
    <div id={currentTheme}>
      <CreateModal
        isOpen={modalIsOpen}
        latMark={latitude}
        lngMark={longitude}
        places={places}
        setPlaces={setPlaces}
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
        position={position}
				setPosition={setPosition}
        categorias = {categorias}
        API_route_calls = {API_route_calls}
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
        API_route_calls = {API_route_calls}
        setPosition={setPosition}
      />

    </div>
  );
}
