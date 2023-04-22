import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import CreateMap from "./Mapa/Map";
import CreateModal from "./Mapa/PlacesForm";
import DrawerSidebar from "./Sidebar/Drawer";
import "./Sidebar/Sidebar.css";
import SettingsSpeedDial from "./buttons/SettingsSpeedDial";
import { ThemeContext, Themes } from "./contexts/ThemeContext";
import CircularProgress from '@mui/material/CircularProgress';

export default function App({ logOutFunction }) {
	//Todos los lugares de la aplicacion
	const [places, setPlaces] = React.useState([]);
	const [t, i18n] = useTranslation("global");	// La t sí se usa y hace falta, no borrar
	const [categorias, setCategorias] = useState([]);
	const [rutas, setRutas] = useState([]);
	const [amigos, setAmigos] = useState([]);
	const [loading, setLoading] = useState(0);

	async function updateCategorias() {
		setLoading(current => current+1)
		await axios
			.get("http://localhost:8080/location/category", { withCredentials: true })
			.then((response) => setCategorias(response.data))
			.catch((error) => console.log(error));
		setLoading(current => current-1)
	}

	async function updateAmigos() {
		setLoading(current => current+1)
		var friends
		try {
			// TODO: get the friends from the API
			console.log("COGER AMIGOS DESDE LA API")
			friends = []
			
			friends.forEach(friend => {friend.locations = []})
			// TODO: add the locations from the API
			console.log("COGER LOCATIONS DE CADA AMIGO DESDE LA API")
		} catch (error) {
			console.log(error)
		}

		setAmigos(friends)
		setLoading(current => current-1)
	}

	async function updateRutas() {
		setLoading(current => current+1)
		const url = "http://localhost:8080/route";
		await axios
			.get(url, { withCredentials: true })
			.then((response) => setRutas(response.data))
			.catch((error) => console.log(error));
		setLoading(current => current-1)
	}

	async function updateLocations() {
		setLoading(current => current+1)
		await axios
			.get("http://localhost:8080/location", { withCredentials: true })
			.then((response) => setPlaces(response.data))
			.catch((error) => console.log(error));
		setLoading(current => current-1)
	}

	useEffect(() => {
		updateLocations();
	},[]);

	useEffect(() => {
		updateCategorias();
	}, []);

	useEffect(() => {
		updateRutas();
	}, [places]);

	useEffect(() => {
		updateAmigos();
	}, []);

	async function API_getRouteByID(routeID) {
		const url = "http://localhost:8080/route/" + routeID;
		const response = await axios.get(url, { withCredentials: true });
		return response;
	}

	async function API_addRoute(routeName, routeDescription) {
		const url = "http://localhost:8080/route";
		const data = {
			name: routeName,
			description: routeDescription,
		};
		const response = await axios.post(url, data, { withCredentials: true });
		updateRutas()
		return response
	}

	async function API_deleteRoute(routeID) {
		const url = "http://localhost:8080/route/" + routeID;
		const response = await axios.delete(url, { withCredentials: true });
		updateRutas()
		return response;
	}

	function API_updateRouteInfo(routeID, newRouteName, newRouteDescription) {
		const url = "http://localhost:8080/route/" + routeID;
		const data = {
			name: newRouteName,
			description: newRouteDescription,
		};
		return axios.put(url, data, { withCredentials: true }).then(updateRutas);
	}

	function API_addLocationToRoute(routeID, locationID) {
		const url =
			"http://localhost:8080/route/" + routeID + "/location/" + locationID;
		return axios.get(url, { withCredentials: true }).then(updateRutas);
	}

	function API_deleteLocationFromRoute(routeID, locationID) {
		const url =
			"http://localhost:8080/route/" + routeID + "/location/" + locationID;
		return axios.delete(url, { withCredentials: true }).then(updateRutas);
	}

	function API_changeOrderOfLocationInRoute(routeID, locationID, newPosition) {
		const url =
			"http://localhost:8080/route/" + routeID + "/location/" + locationID;
		const data = {
			index: newPosition,
		};
		return axios.post(url, data, { withCredentials: true }).then(updateRutas);
	}

	const API_route_calls = {
		// "API_getAllRoutes": API_getAllRoutes,
		API_getRouteByID: API_getRouteByID,
		API_addRoute: API_addRoute,
		API_updateRouteInfo: API_updateRouteInfo,
		API_deleteRoute: API_deleteRoute,
		API_addLocationToRoute: API_addLocationToRoute,
		API_deleteLocationFromRoute: API_deleteLocationFromRoute,
		API_changeOrderOfLocationInRoute: API_changeOrderOfLocationInRoute,
	};

	async function API_createLocation() {
		// TODO implement
		console.log("create location pendiente")
		return 0
		// TODO change
	}

	async function API_deleteLocation(locationID) {
		// TODO: implement
		const url = "http://localhost:8080/location/" + locationID;
		const response = await axios.delete(url, { withCredentials: true });
		updateLocations()
		return response
	}

	async function API_updateLocation(placeID, newName, newCategory, newPrivacy) {
		// TODO: implement
		const url = "http://localhost:8080/location/" + placeID;
		const data = {
			name: newName,
			category: newCategory,
			privacy: newPrivacy,
		};
		const response = await axios.put(url, data, { withCredentials: true });
		updateLocations()
		return response
	}

	async function API_addReview() {
		// TODO: implementar
		console.log("PENDIENTE")
	}

	async function API_removeReview() {
		// TODO: implement
		console.log("PENDIENTE")
	}

	async function API_updateReview() {
		// TODO: implement
		console.log("PENDIENTE")
	}
	
	async function API_addPhoto() {}
	async function API_removePhoto() {}

	async function API_addFriend(friendName, friendWebId) {
		const url = "http://localhost:8080/friend";
		const data = {
			name: friendName,
			webId: friendWebId,
		};
		const response = await axios.post(url, data, { withCredentials: true });
		updateAmigos();
		return response
	}

	async function API_deleteFriend(friendID) {
		const url = "http://localhost:8080/friend/" + friendID;
		const response = await axios.delete(url, { withCredentials: true });
		updateAmigos();
		return response
	}

	const API_location_calls = {
		API_createLocation: API_createLocation,
		API_deleteLocation: API_deleteLocation,
		API_updateLocation: API_updateLocation,
		API_addReview : API_addReview,
		API_removeReview: API_removeReview,
		API_updateReview: API_updateReview,
		API_addPhoto: API_addPhoto,
		API_removePhoto: API_removePhoto
	};
	const API_friend_calls = {
		API_addFriend: API_addFriend,
		API_deleteFriend: API_deleteFriend,
	};

	//Estados de la aplicacion
	//Latitud y longitud del marcador actual que tu pongas en el mapa.
	const [latitude, setLatitude] = React.useState("");
	const [longitude, setLongitude] = React.useState("");

	//Constante de el marcador, es donde se guarda el marcador actual para mostrarlo en el mapa.
	const [markers, setMarkers] = React.useState([]);

	//Controla si el boton para añadir marcador a puntos esta activado, este boton saca el popup con el formulario
	const [disabledB, setDisabledB] = React.useState(true);

	//Constantes del Modal
	const [modalIsOpen, setIsOpen] = React.useState(false);

	//Se puede clickar en el mapa
	const [canCick, setCanCick] = React.useState(false);

	function openModal(boolean) {
		setIsOpen(boolean);
	}

	const { currentTheme, setCurrentTheme } = useContext(ThemeContext);
	function toggleTheme() {
		setCurrentTheme((current) =>
			current === Themes.LIGHT ? Themes.DARK : Themes.LIGHT
		);
	}
	function toggleLanguage() {
		i18n.changeLanguage(i18n.language === "es" ? "en" : "es");
	}

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [drawerContent, setDrawerContent] = useState(null);

	function restoreDefautlDrawerContent() {
		setDrawerContent(null);
	}

	function changeDrawerContent(newContent = null) {
		setIsDrawerOpen(true);
		setDrawerContent(newContent);
	}

	//Constante de el centro de el mapa cuando se carga, si la geolocalización no falla deberia ser la unicación del usuario.
	const [position, setPosition] = useState({
		lat: 0,
		lng: 0,
	});

	return (
		Boolean(loading) ?
		<CircularProgress
			size={45}
			style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
		/> :
		<div id={currentTheme}>
			<CreateModal
				isOpen={modalIsOpen}
				latMark={latitude}
				lngMark={longitude}
				places={places}
				updateLocations={updateLocations}
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
				categorias={categorias}
				API_route_calls={API_route_calls}
				API_location_calls={API_location_calls}
			/>

			<SettingsSpeedDial
				changeLanguage={toggleLanguage}
				toggleTheme={toggleTheme}
				logOutFunction={logOutFunction}
			/>

			<DrawerSidebar
				userPlaces={places}
				isDrawerOpen={isDrawerOpen}
				setIsDrawerOpen={setIsDrawerOpen}
				contentToDisplay={drawerContent}
				restoreDefautlDrawerContent={restoreDefautlDrawerContent}
				changeDrawerContent={changeDrawerContent}
				categorias={categorias}
				rutas={rutas}
				API_route_calls={API_route_calls}
				API_location_calls={API_location_calls}
				setPosition={setPosition}
				amigos={amigos}
				API_friend_calls={API_friend_calls}
			/>
		</div>
	);
}
