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
	const [places, setPlaces] = React.useState(a);

	const [data, setData] = useState("");
	const [t, i18n] = useTranslation("global");	// La t sí se usa y hace falta, no borrar
	const [categorias, setCategorias] = useState([]);
	const [rutas, setRutas] = useState([]);
	const [amigos, setAmigos] = useState([]);

	function updateCategorias() {
		axios
			.get("http://localhost:8080/location/category", { withCredentials: true })
			.then((response) => {
				setCategorias(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	async function updateAmigos() {
		await axios
			.get("http://localhost:8080/friend", { withCredentials: true })
			.then((response) => {
				setAmigos(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	async function updateRutas() {
		const url = "http://localhost:8080/route";
		return await axios
			.get(url, { withCredentials: true })
			.then((response) => setRutas(response.data))
			.catch((error) => console.log(error));
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

	function API_deleteLocation(locationID) {
		const url = "http://localhost:8080/location/" + locationID;
		return axios.delete(url, { withCredentials: true });
		// TODO actualizar lugares
	}

	function API_updateLocation(placeID, newName, newCategory, newPrivacy) {
		const url = "http://localhost:8080/location/" + placeID;
		const data = {
			name: newName,
			category: newCategory,
			privacy: newPrivacy,
		};
		return axios.put(url, data, { withCredentials: true });
		//TODO actualizar lugares
	}

	async function API_addFriend(friendName, friendWebId) {
		const url = "http://localhost:8080/friend";
		const data = {
			name: friendName,
			webId: friendWebId,
		};
		await axios.post(url, data, { withCredentials: true });
		updateAmigos();
	}

	async function API_deleteFriend(friendID) {
		const url = "http://localhost:8080/friend/" + friendID;
		const response = await axios.delete(url, { withCredentials: true });
		updateAmigos();
	}

	const API_location_calls = {
		API_deleteLocation: API_deleteLocation,
		API_updateLocation: API_updateLocation,
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
