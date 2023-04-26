import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useContext, useEffect, useRef, useState } from "react";
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
const FriendsController = require("./backend/controllers/FriendController");

export default function App({ logOutFunction, isLoggedIn }) {
	//Todos los lugares del usuario
	const [places, setPlaces] = React.useState([]);
	//Todos los lugares de los amigos
	const [friendPlaces, setFriendPlaces] = useState([]);

	const [t, i18n] = useTranslation("global"); // La t sí se usa y hace falta, no borrar
	const [categorias, setCategorias] = useState([]);
	const [rutas, setRutas] = useState([]);
	const [amigos, setAmigos] = useState([]);
	const [loading, setLoading] = useState(0);
	const [solicitudes, setSolicitudes] = useState([]);

	const routesMemoization = useRef({})

	async function checkLoggedIn() {
		let session = getDefaultSession();

		if (!session.info.isLoggedIn) {
			session.login();
		}
	}

	async function updateCategorias() {
		setLoading((current) => current + 1);
		checkLoggedIn();
		try {
			const response = await LocationController.getCategories();
			setCategorias(response);
		} catch (error) {
			alert(error);
		}
		setLoading((current) => current - 1);
	}

	async function updateAmigos() {
		setLoading((current) => current + 1);
		var friends;
		try {
			friends = await FriendsController.getAllFriends(getDefaultSession());
			setAmigos(friends);
		} catch (error) {
			alert(error);
		}
		setLoading((current) => current - 1);
	}

	async function updateRutas() {
		setLoading((current) => current + 1);
		checkLoggedIn();
		try {
			const response = await RoutesController.getAllRoutes(getDefaultSession());
			setRutas(response);
		} catch (error) {
			alert(error);
		}
		setLoading((current) => current - 1);
	}

	async function updateLocations() {
		setLoading((current) => current + 1);
		checkLoggedIn();
		try {
			const response = await LocationController.getAllLocations(
				getDefaultSession()
			);
			setPlaces(response);
		} catch (error) {
			alert(error);
		}
		setLoading((current) => current - 1);
	}

	async function updateSolicitudes() {
		setLoading((current) => current + 1);
		try {
			const response = await API_getAllRequests();
			setSolicitudes(response);
		} catch (error) {
			alert(error);
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

	useEffect(() => {
		updateSolicitudes();
	}, []);

	async function getRouteByID(routeID) {
		checkLoggedIn();
		const routeFromMemoization = routesMemoization[routeID]
		if (routeFromMemoization) {
			return routeFromMemoization;
		}

		try {
			const response = await RoutesController.getAllLocationsByRouteId(
				getDefaultSession(),
				routeID
			);
			routesMemoization[routeID] = response
			return response;
		} catch (error) {
			alert(error);
		}
	}

	async function API_addRoute(routeName, routeDescription) {
		const data = {
			name: routeName,
			description: routeDescription,
		};
		try {
			const response = await RoutesController.addRoute(
				getDefaultSession(),
				data
			);
			updateRutas();
			return response;
		} catch (error) {
			alert(error);
		}
	}

	async function API_deleteRoute(routeID) {
		try {
			const response = await RoutesController.deleteRoute(
				getDefaultSession(),
				routeID
			);
			updateRutas();
			return response;
		} catch (error) {
			alert(error);
		}
	}

	async function API_updateRouteInfo(
		routeID,
		newRouteName,
		newRouteDescription
	) {
		const data = {
			name: newRouteName,
			description: newRouteDescription,
		};
		try {
			const response = await RoutesController.updateRoute(
				getDefaultSession(),
				routeID,
				data
			);
			updateRutas();
			return response;
		} catch (error) {
			alert(error);
		}
	}

	async function API_addLocationToRoute(routeID, locationID) {
		try {
			const response = await RoutesController.addLocationToRoute(
				getDefaultSession(),
				routeID,
				locationID
			);
			updateRutas();
			return response;
		} catch (error) {
			alert(error);
		}
	}

	async function API_deleteLocationFromRoute(routeID, locationID) {
		try {
			const response = await RoutesController.deleteLocationFromRoute(
				getDefaultSession(),
				routeID,
				locationID
			);
			updateRutas();
			return response;
		} catch (error) {
			alert(error);
		}
	}

	async function API_changeOrderOfLocationInRoute(
		routeID,
		locationID,
		newPosition
	) {
		try {
			const response = await RoutesController.changeOrderOfLocationInRoute(
				getDefaultSession(),
				routeID,
				locationID,
				newPosition
			);
			updateRutas();
			return response;
		} catch (error) {
			alert(error);
		}
	}

	const API_route_calls = {
		// "API_getAllRoutes": API_getAllRoutes,
		getRouteByID: getRouteByID,
		API_addRoute: API_addRoute,
		API_updateRouteInfo: API_updateRouteInfo,
		API_deleteRoute: API_deleteRoute,
		API_addLocationToRoute: API_addLocationToRoute,
		API_deleteLocationFromRoute: API_deleteLocationFromRoute,
		API_changeOrderOfLocationInRoute: API_changeOrderOfLocationInRoute,
	};

	async function API_createLocation(location) {
		try {
			const response = await LocationController.createLocation(
				getDefaultSession(),
				location
			);
			updateLocations();
			return response;
		} catch (error) {
			alert(error);
		}
	}

	async function API_deleteLocation(locationID) {
		try {
			const response = await LocationController.deleteLocation(
				getDefaultSession(),
				locationID
			);
			updateLocations();
			return response;
		} catch (error) {
			alert(error);
		}
	}

	async function API_updateLocation(placeID, location) {
		try {
			const response = await LocationController.updateLocation(
				getDefaultSession(),
				placeID,
				location
			);
			updateLocations();
			return response;
		} catch (error) {
			alert(error);
		}
	}

	async function API_addReview() {
		// TODO: implementar
	}
	//eh
	async function API_removeReview() {
		// TODO: implement
	}

	async function API_updateReview() {
		// TODO: implement
	}

	function getwebId() {
		return getDefaultSession().info.webId;
	}

	async function API_addPhoto() {}
	async function API_removePhoto() {}

	const API_location_calls = {
		API_createLocation: API_createLocation,
		API_deleteLocation: API_deleteLocation,
		API_updateLocation: API_updateLocation,
		API_addReview: API_addReview,
		API_removeReview: API_removeReview,
		API_updateReview: API_updateReview,
		API_addPhoto: API_addPhoto,
		API_removePhoto: API_removePhoto,
	};

	async function API_generateNewFriendRequest(receiverwebId, newFriendName) {
		const friend = {
			name: newFriendName,
			webId: receiverwebId,
		};
		try {
			const response = await FriendsController.sendFriendRequest(
				getDefaultSession(),
				friend
			);
			return response;
		} catch (error) {
			alert(error);
		}
	}

	async function API_getAllRequests() {
		try {
			const res = await FriendsController.getAllRequests(getDefaultSession());
			return res;
		} catch (error) {
			alert(error);
		}
	}

	async function API_acceptIncomingFriendRequest(webIdToAccept) {
		try {
			const res = await FriendsController.acceptRequest(
				getDefaultSession(),
				webIdToAccept
			);
			updateSolicitudes();
			return res;
		} catch (error) {
			alert(error);
		}
	}

	async function API_rejectIncomingFriendRequest(webIdToReject) {
		try {
			const res = await FriendsController.rejectRequest(
				getDefaultSession(),
				webIdToReject
			);
			updateSolicitudes();
			return res;
		} catch (error) {
			alert(error);
		}
	}
	async function API_removeFriend(friendwebId) {
		try {
			const res = await FriendsController.deleteFriend(
				getDefaultSession(),
				friendwebId
			);
			updateAmigos();
			return res;
		} catch (error) {
			alert(error);
		}
	}

	async function API_getAllFriends() {
		try {
			const res = await FriendsController.getAllFriends(getDefaultSession());
			return res;
		} catch (error) {
			alert(error);
		}
	}
	async function API_getPlacesOfFriend(friendwebId) {
		try {
			const res = await FriendsController.getFriendLocations(
				getDefaultSession(),
				friendwebId
			);
			return res;
		} catch (error) {
			alert(error);
		}
	}

	const API_friend_calls = {
		API_generateNewFriendRequest: API_generateNewFriendRequest,
		API_getAllRequests: API_getAllRequests,
		API_acceptIncomingFriendRequest: API_acceptIncomingFriendRequest,
		API_rejectIncomingFriendRequest: API_rejectIncomingFriendRequest,
		API_removeFriend: API_removeFriend,
		API_getAllFriends: API_getAllFriends,
		API_getPlacesOfFriend: API_getPlacesOfFriend,
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
		<CircularProgress
			size={45}
			style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
			}}
		/>
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
				getwebId={getwebId}
				friendPlaces={friendPlaces}
			/>

			<SettingsSpeedDial
				changeLanguage={toggleLanguage}
				toggleTheme={toggleTheme}
				logOutFunction={logOutFunction}
				isLoggedIn={isLoggedIn}
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
				solicitudes={solicitudes}
				setFriendsPlaces={setFriendPlaces}
				friendsPlaces={friendPlaces}
			/>
		</div>
	);
}
