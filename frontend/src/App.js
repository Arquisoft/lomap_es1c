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
	// Los lugares del usuario
	const [places, setPlaces] = React.useState([]);
	// Los lugares de los amigos
	const [friendPlaces, setFriendPlaces] = useState([]);

	const [visibleFriends, setVisibleFriends] = useState([])

	const [t, i18n] = useTranslation("global"); // La t sí se usa y hace falta, no borrar
	const [categorias, setCategorias] = useState([]);
	const [rutas, setRutas] = useState([]);
	const [amigos, setAmigos] = useState([]);
	const [loading, setLoading] = useState(0);
	const [solicitudes, setSolicitudes] = useState([]);

	function getFriendName(webId) {
		return amigos.find(a => a.webId === webId).name;
	}

	async function addFriendMarkersToMap(friendwebId) {
		setVisibleFriends(current => [...current, friendwebId])

		const placesToAdd = await API_friend_calls.getPlacesOfFriend(friendwebId);
		setFriendPlaces(current => current.concat(placesToAdd))
	}

	function removeFriendMarkersToMap(friendwebId) {
		setVisibleFriends(current => current.filter(friend => friend !== friendwebId))
		setFriendPlaces(current => current.filter(place => place.author !== friendwebId))
	}

	const routesMemoization = useRef({});
	const friendPlacesMemoization = useRef({});
	const fullPlacesInfoMemoization = useRef({});

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

		const routeFromMemoization = routesMemoization[routeID];
		if (routeFromMemoization) {
			return routeFromMemoization;
		}

		try {
			const response = await RoutesController.getAllLocationsByRouteId(
				getDefaultSession(),
				routeID
			);
			routesMemoization[routeID] = response;
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
		// Delete from memoization
		fullPlacesInfoMemoization[locationID] = null

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
		// Delete from memoization
		fullPlacesInfoMemoization[placeID] = null

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

	async function API_addReview(locationID, webidAuthorLocation, review) {
		try {
			const response = await LocationController.addReview(
				getDefaultSession(),
				locationID,
				webidAuthorLocation,
				review
			)
			fullPlacesInfoMemoization[locationID] = null
			return response
		} catch (error) {
			alert(error)
		}
	}

	async function API_removeReview(locationId, reviewID) {
		try {
			const response = await LocationController.deleteReview(
				getDefaultSession(),
				reviewID
			)
			fullPlacesInfoMemoization[locationId] = null
			return response
		} catch (error) {
			alert(error)
		}
	}

	async function API_updateReview(reviewID, theNewReview, locationID) {
		try {
			const response = await LocationController.updateReview(
				getDefaultSession(),
				reviewID,
				theNewReview
			)
			fullPlacesInfoMemoization[locationID] = null
			return response
		} catch (error) {
			alert(error)
		}
	}

	function getwebId() {
		return getDefaultSession().info.webId;
	}

	async function API_addPhoto(placeID, webIdAuthor, photo) {
		try {
			const response = await LocationController.addPhoto(
				getDefaultSession(),
				placeID,
				{imageJPG: photo},
				webIdAuthor
			)
			fullPlacesInfoMemoization[placeID] = null
			return response
		} catch (error) {
			alert (error)
		}
	}
	async function API_removePhoto(placeId, idPhoto) {
		try {
			const response = await LocationController.deletePhoto(
				getDefaultSession(),
				idPhoto
				);
			fullPlacesInfoMemoization[placeId] = null
			return response
		} catch (error) {
			alert(error)
		}
	}

	async function API_getPlaceById(placeID) {
		checkLoggedIn();

		const infoFromMemoization = fullPlacesInfoMemoization[placeID];
		if (infoFromMemoization) {
			return infoFromMemoization;
		}

		try {
			const response = await LocationController.getLocation(
				getDefaultSession(),
				placeID
			);
			if (response) {
				fullPlacesInfoMemoization[placeID] = response;
			}
			return response;
		} catch (error) {
			alert(error);
		}
	}

	async function getAnyPlaceById(webId,placeId){
		const creatorWebId = getwebId();
		if(webId === creatorWebId){
			return await API_getPlaceById(placeId);
		}else{
			return await API_friend_calls.getPlaceOfFriendById(webId,placeId)
		}
	}

	const API_location_calls = {
		API_createLocation: API_createLocation,
		API_deleteLocation: API_deleteLocation,
		API_updateLocation: API_updateLocation,
		API_addReview: API_addReview,
		API_removeReview: API_removeReview,
		API_updateReview: API_updateReview,
		API_addPhoto: API_addPhoto,
		API_removePhoto: API_removePhoto,
		API_getPlaceById:getAnyPlaceById
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

	async function API_acceptIncomingFriendRequest(webIdToAccept, nameForTheNewFriend) {
		try {
			const res = await FriendsController.acceptRequest(
				getDefaultSession(),
				webIdToAccept,
				nameForTheNewFriend
			);
			setSolicitudes(current => current.filter(s => s.sender!==webIdToAccept))
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
			setSolicitudes(current => current.filter(s => s.sender!==webIdToReject))
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
			removeFriendMarkersToMap(friendwebId)
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

	async function getPlacesOfFriend(friendwebId) {
		checkLoggedIn();

		const placesFromMemoization = friendPlacesMemoization[friendwebId];
		if (placesFromMemoization) {
			return placesFromMemoization;
		}

		try {
			const response = await FriendsController.getFriendLocations(
				getDefaultSession(),
				friendwebId
			);
			friendPlacesMemoization[friendwebId] = response;
			return response;
		} catch (error) {
			alert(error);
		}
	}

	async function getPlaceOfFriendById(friendwebId, placeId) {
		checkLoggedIn();

		const placeFromMemoization = fullPlacesInfoMemoization[placeId];
		if (placeFromMemoization) {
			return placeFromMemoization
		}

		try{
			const response = await FriendsController.getFriendLocationById(
				getDefaultSession(),
				friendwebId,
				placeId
			);
			fullPlacesInfoMemoization[placeId] = response
			return response;
		}	catch(error){
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
		getPlacesOfFriend: getPlacesOfFriend,
		getPlaceOfFriendById: getPlaceOfFriendById,
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
				getwebId={getwebId}
				addFriendMarkersToMap = {addFriendMarkersToMap}
				removeFriendMarkersToMap = {removeFriendMarkersToMap}
				visibleFriends = {visibleFriends}
				getFriendName = {getFriendName}
			/>
		</div>
	);
}
