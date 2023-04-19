import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import CircularProgress from "@mui/material/CircularProgress";
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

const LocationController = require("./backend/controllers/LocationController");
const RoutesController = require("./backend/controllers/RouteController");

export default function App({ logOutFunction }) {
	//Todos los lugares de la aplicacion
	const [places, setPlaces] = React.useState([]);
	const [t, i18n] = useTranslation("global"); // La t sí se usa y hace falta, no borrar
	const [categorias, setCategorias] = useState([]);
	const [rutas, setRutas] = useState([]);
	const [amigos, setAmigos] = useState([]);
	const [loading, setLoading] = useState(0);

	async function checkLoggedIn() {
		let session = getDefaultSession();
		console.log(session.info.isLoggedIn);
		session.info.isLoggedIn = false;
		if (!session.info.isLoggedIn) {
			console.log("aaa");
			session.login();
		}
	}

	async function updateCategorias() {
		setLoading((current) => current + 1);
		checkLoggedIn();
		try {
			const response = await LocationController.getCategories()
			setCategorias(response)
		} catch (error) {
			alert(error)
		}
		setLoading((current) => current - 1);
	}

	async function updateAmigos() {
		setLoading((current) => current + 1);
		await axios
			.get("http://localhost:8080/friend", { withCredentials: true })
			.then((response) => setAmigos(response.data))
			.catch((error) => console.log(error));
		setLoading((current) => current - 1);
	}

	async function updateRutas() {
		setLoading((current) => current + 1);
		checkLoggedIn();
		try {
			const response = await RoutesController.getAllRoutes(getDefaultSession())
			setRutas(response)
		} catch (error) {
			alert(error)
		}
		setLoading((current) => current - 1);
	}

	async function updateLocations() {
		setLoading((current) => current + 1);
		checkLoggedIn();
		try {
			const response = await LocationController.getAllLocations(getDefaultSession())
			setPlaces(response)
		} catch (error) {
			alert(error)
		}
		setLoading((current) => current - 1);
	}

	useEffect(() => {
		updateLocations();
	}, []);

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
		checkLoggedIn();
		try {
			const response = await RoutesController.getAllLocations(getDefaultSession(), routeID)
			return response
		} catch (error) {
			alert(error)
		}
	}

	async function API_addRoute(routeName, routeDescription) {
		const data = {
			name: routeName,
			description: routeDescription,
		};
		try {
			const response = await RoutesController.addRoute(getDefaultSession(), data)
			updateRutas();
			return response
		} catch (error) {
			alert(error)
		}
	}

	async function API_deleteRoute(routeID) {
		try {
			const response = await RoutesController.deleteRoute(getDefaultSession(), routeID)
			updateRutas();
			return response
		} catch (error) {
			alert(error)
		}
	}

	async function API_updateRouteInfo(routeID, newRouteName, newRouteDescription) {
		const data = {
			name: newRouteName,
			description: newRouteDescription,
		};
		try {
			const response = await RoutesController.updateRouteInfo(getDefaultSession(), routeID, data)
			updateRutas()
			return response
		} catch (error) {
			alert(error)
		}
	}

	async function API_addLocationToRoute(routeID, locationID) {
		try {
			const response = await RoutesController.addLocationToRoute(getDefaultSession(), routeID, locationID)
			updateRutas()
			return response
		} catch (error) {
			alert(error)
		}
	}

	async function API_deleteLocationFromRoute(routeID, locationID) {
		try {
			const response = await RoutesController.deleteLocationFromRoute(getDefaultSession(), routeID, locationID)
			updateRutas()
			return response
		} catch (error) {
			alert(error)
		}
	}

	async function API_changeOrderOfLocationInRoute(routeID, locationID, newPosition) {
		try {
			const response = await RoutesController.changeOrderOfLocationInRoute(getDefaultSession(), routeID, locationID, newPosition)
			updateRutas()
			return response
		} catch (error) {
			alert(error)
		}
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

	async function API_createLocation(location) {
		try {
			const response = await LocationController.createLocation(getDefaultSession(), location)
			updateLocations()
			return response
		} catch (error) {
			alert(error)
		}
	}

	async function API_deleteLocation(locationID) {
		try {
			const response = await LocationController.deleteLocation(getDefaultSession(), locationID)
			updateLocations()
			return response
		} catch (error) {
			alert(error)
		}
	}

	async function API_updateLocation(placeID, location) {
		try {
			const response = await LocationController.updateLocation(getDefaultSession(), placeID, location)
			updateLocations();
			return response
		} catch (error) {
			alert(error)
		}
	}

	async function API_addFriend(friendName, friendWebId) {
		const url = "http://localhost:8080/friend";
		const data = {
			name: friendName,
			webId: friendWebId,
		};
		const response = await axios.post(url, data, { withCredentials: true });
		updateAmigos();
		return response;
	}

	async function API_deleteFriend(friendID) {
		const url = "http://localhost:8080/friend/" + friendID;
		const response = await axios.delete(url, { withCredentials: true });
		updateAmigos();
		return response;
	}

	const API_location_calls = {
		API_createLocation: API_createLocation,
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

	return Boolean(loading) ? (
		<CircularProgress />
	) : (
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
				API_location_calls={API_location_calls}
				categorias={categorias}
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
