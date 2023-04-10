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
  const [i18n] = useTranslation("global")
  const [categorias, setCategorias] = useState([])
  const [rutas, setRutas] = useState([])
  const [amigos, setAmigos] = useState([])

  function updateCategorias() {
    axios.get('http://localhost:8080/location/category', { withCredentials: true })
    .then(response => {setCategorias(response.data);})
    .catch(error => {console.log(error);});
  }

  function updateAmigos() {
		async function getAmigosData() {
			await axios
				.get("http://localhost:8080/friend", { withCredentials: true })
				.then((response) => {setAmigos(response.data)})
				.catch((error) => {console.log(error);});
		}
		getAmigosData();
  }

  function updateRutas() {
    async function API_getAllRoutes() {
      await axios
        .get("http://localhost:8080/route", {withCredentials: true})
        .then((response) => {setRutas(response)})
        .catch((error) => {console.log(error);})
      }
    API_getAllRoutes()
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
						categoria: data[i].category
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

  useEffect(() => {
    updateAmigos()
  }, [])



  async function API_getRouteByID(routeID) {
    const url = "http://localhost:8080/route/"+routeID
    const response = await axios.get(url, {withCredentials: true})
    return response
  }

  async function API_addRoute(routeName, routeDescription) {
    const url = "http://localhost:8080/route"
    const data = {
      name: routeName,
      description: routeDescription
    }
    const response = await axios.post(url, data, {withCredentials: true})
    updateRutas()
    return response.id
  }

  function API_updateRouteInfo(routeID, newRouteName, newRouteDescription) {
    const url = "http://localhost:8080/route/"+routeID
    const data = {
      name: newRouteName,
      description: newRouteDescription
    }
    axios.put(url, data, {withCredentials: true})
    updateRutas()
  }

  function API_deleteRoute(routeID) {
    const url = "http://localhost:8080/route/"+routeID
    axios.delete(url, {withCredentials: true})
    updateRutas()
  }

  function API_addLocationToRoute(routeID, locationID) {
    const url = "http://localhost:8080/route/"+routeID+"/location/"+locationID
    axios.get(url, {withCredentials: true})
    updateRutas()
  }

  function API_deleteLocationFromRoute(routeID, locationID) {
    const url = "http://localhost:8080/route/"+routeID+"/location/"+locationID
    axios.delete(url, {withCredentials: true})
    updateRutas()
  }

  function API_changeOrderOfLocationInRoute(routeID, locationID, newPosition) {
    const url = "http://localhost:8080/route/"+routeID+"/location/"+locationID
    const data = {
      index: newPosition
    }
    axios.post(url, data, {withCredentials: true})
    updateRutas()
  }

  const API_route_calls = {
    // "API_getAllRoutes": API_getAllRoutes,
    "API_getRouteByID": API_getRouteByID,
    "API_addRoute": API_addRoute,
    "API_updateRouteInfo": API_updateRouteInfo,
    "API_deleteRoute": API_deleteRoute,
    "API_addLocationToRoute": API_addLocationToRoute,
    "API_deleteLocationFromRoute": API_deleteLocationFromRoute,
    "API_changeOrderOfLocationInRoute": API_changeOrderOfLocationInRoute
  }

  function API_updateLocation(placeID, newName, newCategory, newPrivacy) {
    const url = "http://localhost:8080/location/"+placeID
    const data = {
        name: newName,
        category: newCategory,
        privacy: newPrivacy
    };
    const config = {
        withCredentials: true,
    };
    axios.put(url, data, config);

    // TODO: actualizar datos
  }

  function API_addFriend(friendName, friendWebId) {
    const url = "http://localhost:8080/friend"
    const data = {
      name: friendName,
      webid: friendWebId
    }
    const config = {
      withCredentials: true,
    }
    axios.post(url, data, config)

    updateAmigos()
  }

  function API_deleteFriend(friendWebID) {
    const url = "http://localhost:8080/friend/"+friendWebID
    const config = {
      withCredentials: true,
    }
    axios.delete(url, config)
    updateAmigos()
  }

  const API_location_calls = {
    "API_updateLocation": API_updateLocation,
  }
  const API_friend_calls = {
    "API_addFriend": API_addFriend,
    "API_deleteFriend": API_deleteFriend,
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
        API_location_calls = {API_location_calls}
        setPosition={setPosition}
        amigos = {amigos}
        API_friend_calls = {API_friend_calls}
      />

    </div>
  );
}
