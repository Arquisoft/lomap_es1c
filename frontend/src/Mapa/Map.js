import { Alert, AlertTitle, Snackbar } from "@mui/material";
import {
	GoogleMap,
	Marker,
	MarkerF,
	useLoadScript,
} from "@react-google-maps/api";
import Geolocation from "@react-native-community/geolocation";
import React, { useContext, useEffect, useRef, useState } from "react";
import FullInfoPlace from "../Sidebar/lugares/FullInfoPlace.js";
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
	getwebId,
	friendPlaces
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
				getwebId={getwebId}
				friendPlaces = {friendPlaces}
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
	getwebId,
	friendPlaces
}) {
	//Obtención de la localización del usuario segun entre para centrar el mapa en su ubicación.

	//Diferentes estados necesarios para el mapa.
	const [openInfo, setOpenInfo] = React.useState(false);
	const [categortFiltered, setCategortFiltered] = useState({
		activated: false,
		category: "",
	});
	const [friendsFilter, setFriendsFilter] = useState(false);
	const [onlyMineFilter, setOnlyMineFilter] = useState(false);

	function Filter() {
		var temp = places.concat(friendPlaces);
		var actualUser;
		var aux = [];

		if (categortFiltered.activated) {
			aux = [];
			for (let i = 0; i < temp.length; i++) {
				if (temp[i].category.toLowerCase() ===categortFiltered.category.toLowerCase()) {
					aux[aux.length] = temp[i];
				}
			}
			temp = aux;
		}

		if(friendsFilter){
			aux = [];
			actualUser = getwebId();
			for (let i = 0; i < temp.length; i++) {
				if (temp[i].author.toLowerCase() !== actualUser.toLowerCase()) {
					aux[aux.length] = temp[i];
				}
			}
			temp = aux;
		}else if(onlyMineFilter){
			aux = [];
			actualUser = getwebId();
			for (let i = 0; i < temp.length; i++) {
				if (temp[i].author.toLowerCase() === actualUser.toLowerCase()) {
					aux[aux.length] = temp[i];
				}
			}
			temp = aux;
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
      setMarkers((current) => [current,
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
          lng: position.coords.longitude
        })
        if (position.coords.latitude !== 0) {
          Located = false;
        }
      }
    }
    );

		mapRef.current = map;
	}

	const { currentTheme } = useContext(ThemeContext);
	const [currentMapStyle, setCurrentMapStyle] = useState();

	useEffect(() => {
		setCurrentMapStyle(
			currentTheme === Themes.LIGHT ? lightMapStyle : darkMapStyle
		);
	}, [currentTheme]);

	async function details(marker) {
		var userWebId = getwebId();
		var allPlaces = places.concat(friendPlaces);
		const place = allPlaces.find(place => place.id === marker.id)
		var placeFull = await API_location_calls.API_getPlaceById(place.author,marker.id)
		changeDrawerContent(
			<FullInfoPlace
				place={placeFull}
				returnFunction={restoreDefautlDrawerContent}
				changeDrawerContent={changeDrawerContent}
				categorias={categorias}
				setPosition={setPosition}
				API_location_calls={API_location_calls}
				loggedInUserwebId={userWebId}
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
				data-testid="mapa"
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
						position={{ lat: Number(marker.latitude), lng: Number(marker.longitude) }}
						onClick={() => details(marker)}
						//options={{icon: {url:(require("./marker.svg").default),scaledSize: {width: 36, height: 36},fillColor:"#34495e"}}}
					/>
				))}
			</GoogleMap>


			<FilterButtons
				setCategortFiltered={setCategortFiltered}
				categorias={categorias}
				setFriendsFilter = {setFriendsFilter}
				setOnlyMineFilter = {setOnlyMineFilter}
			/>
		</div>
	);
}
