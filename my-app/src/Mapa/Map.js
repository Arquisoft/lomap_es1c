import { Alert, AlertTitle, Snackbar } from "@mui/material";
import {
	GoogleMap,
	Marker,
	MarkerF,
	useLoadScript,
} from "@react-google-maps/api";
import Geolocation from "@react-native-community/geolocation";
import React, { useContext, useEffect, useRef, useState } from "react";
import FullInfoPlace from "../Sidebar/cards/FullInfoPlace";
import { ThemeContext, Themes } from "../contexts/ThemeContext";
import OpenIconSpeedDial from "./bottonMarkers";
import FilterButtons from "./filterButtons";
import { darkMapStyle, lightMapStyle } from "./themes/MapThemes";

export default function CreateMap({
	open,
	setLatitude,
	setLongitude,
	markers,
	setMarkers,
	places,
	canCick,
	setCanCick,
	changeDrawerContent,
	restoreDefautlDrawerContent,
	position,
	setPosition,
	categorias,
	API_route_calls,
	API_location_calls,
}) {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	});

	if (!isLoaded) return <div>Loading...</div>;
	return (
		<div>
			<Map
				openModal={open}
				setLatitudeMark={setLatitude}
				setLongitudeMark={setLongitude}
				markersState={markers}
				setMarkers={setMarkers}
				canCick={canCick}
				setCanCick={setCanCick}
				places={places}
				style={{ position: "none" }}
				changeDrawerContent={changeDrawerContent}
				restoreDefautlDrawerContent={restoreDefautlDrawerContent}
				position={position}
				setPosition={setPosition}
				categorias={categorias}
				API_route_calls={API_route_calls}
				API_location_calls={API_location_calls}
			/>
		</div>
	);
}

var Located = true;

function Map({
	openModal,
	setLongitudeMark,
	setLatitudeMark,
	markersState,
	setMarkers,
	places,
	canCick,
	setCanCick,
	changeDrawerContent,
	restoreDefautlDrawerContent,
	categorias,
	position,
	setPosition,
	API_route_calls,
	API_location_calls,
}) {
	//Obtención de la localización del usuario segun entre para centrar el mapa en su ubicación.

	//DIferentes estados necesarios para el mapa.
	const [latitude, setLatitude] = React.useState("");
	const [longitude, setLongitude] = React.useState("");
	const [response, setResponse] = useState(null);
	const [openInfo, setOpenInfo] = React.useState(false);
	const [categortFiltered, setCategortFiltered] = useState({
		activated: false,
		category: "",
	});

	function Filter() {
		var temp = places;
		if (categortFiltered.activated) {
			temp = [];
			for (let i = 0; i < places.length; i++) {
				if (
					places.some(
						() =>
							places[i].categoria.toLowerCase() ===
							categortFiltered.category.toLowerCase()
					)
				) {
					temp[temp.length] = places[i];
				}
			}
		}
		return temp;
	}

	//Constante de el marcador, es donde se guarda el marcador actual para mostrarlo en el mapa.
	const markers = markersState;

	/*Logica de cuando clickas en el mapa, se guardan las cordenadas en el marcador para mostrarlo en el mapa,
	 *pon a enabled el boton para añadir el punto y guarda las coordenadas para luego guardar el marcador.
	 */

	const onMapClick = (e) => {
		if (canCick) {
			setMarkers((current) => [
				current,
				{
					lat: e.latLng.lat(),
					lng: e.latLng.lng(),
				},
			]);
			Located = false;
			setLatitudeMark(Number(e.latLng.lat()));
			setLongitudeMark(Number(e.latLng.lng()));
			openModal(true);
		}
	};

	const directionsCallback = (response) => {
		if (response !== null && response.status === "OK") {
			setResponse(response);
		}
	};

	const mapRef = useRef(null);

	function handleCenter() {
		if (!mapRef.current) return;

		const newPos = mapRef.current.getCenter().toJSON();
		if (newPos.lat === position.lat && newPos.lng === position.lng) return;
		setPosition(newPos);
	}

	function handleLoad(map) {
		Geolocation.getCurrentPosition((position) => {
			if (Located) {
				setPosition({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
				setLatitude(position.coords.latitude);
				setLongitude(position.coords.longitude);
				if (position.coords.latitude !== 0) {
					Located = false;
				}
			}
		});

		mapRef.current = map;
	}

	const { currentTheme } = useContext(ThemeContext);
	const [currentMapStyle, setCurrentMapStyle] = useState();

	useEffect(() => {
		setCurrentMapStyle(
			currentTheme === Themes.LIGHT ? lightMapStyle : darkMapStyle
		);
	}, [currentTheme]);

	function details(marker) {
		changeDrawerContent(
			<FullInfoPlace
				place={places.find((place) => place.id === marker.id)}
				returnFunction={restoreDefautlDrawerContent}
				changeDrawerContent={changeDrawerContent}
				categorias={categorias}
				setPosition={setPosition}
				API_location_calls={API_location_calls}
			/>
		);
	}

	//Nos devuelve el mapa con todos los componentes asociados.
	return (
		<div>
			<Snackbar
				open={openInfo}
				autoHideDuration={6000}
				onClose={() => setOpenInfo(false)}
			>
				<Alert severity="info">
					<AlertTitle>Info</AlertTitle>
					Haga click en el mapa para añadir un punto
				</Alert>
			</Snackbar>

			<OpenIconSpeedDial
				canClick={setCanCick}
				openInfo={setOpenInfo}
				changeDrawerContent={changeDrawerContent}
				restoreDefautlDrawerContent={restoreDefautlDrawerContent}
				userPlaces={places}
				API_route_calls={API_route_calls}
			/>

			<GoogleMap
				zoom={13}
				center={position}
				mapContainerClassName="map-conteiner"
				onClick={(e) => onMapClick(e)}
				onLoad={handleLoad}
				onDragEnd={handleCenter}
				options={{
					styles: currentMapStyle,
					fullscreenControl: false, // Oculta el botón de pantalla completa
					streetViewControl: false, // Oculta el botón de street view
					mapTypeControl: false, // Oculta el botón de mapa/satélite
				}}
			>
				{markers.map((marker) => (
					<Marker
						key={`${marker.lat}-${marker.lng}`}
						position={{ lat: Number(marker.lat), lng: Number(marker.lng) }}
					/>
				))}
				{Filter().map((marker) => (
					<MarkerF
						key={marker.id}
						position={{ lat: Number(marker.lat), lng: Number(marker.lng) }}
						onClick={() => details(marker)}
						//options={{icon: {url:(require("./marker.svg").default),scaledSize: {width: 36, height: 36},fillColor:"#34495e"}}}
					/>
				))}
			</GoogleMap>

			<FilterButtons setCategortFiltered={setCategortFiltered} />
		</div>
	);
}
