import React, { useRef, useState } from "react";
import { GoogleMap, useLoadScript, Marker, MarkerF } from "@react-google-maps/api";
import { Themes, ThemeContext } from '../contexts/ThemeContext';
import Geolocation from '@react-native-community/geolocation';
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import OpenIconSpeedDial from "./bottonMarkers";
import FilterButtons from "./filterButtons";
import { useContext } from "react";
import { useEffect } from "react";
import { darkMapStyle, lightMapStyle } from "./themes/MapThemes";

export default function CreateMap({open,setLatitude,setLongitude,markers,setMarkers,places,canCick,setCanCick}) {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) return <div>Loading...</div>;
    return (
      <div>
        <Map openModal={open} setLatitudeMark={setLatitude} setLongitudeMark={setLongitude} markersState={markers}
        setMarkers={setMarkers} canCick={canCick} setCanCick={setCanCick}
        places={places} style={{position:"none"}}/>
      </div>
    );
  }


var Located = true;

function Map({openModal,setLongitudeMark,setLatitudeMark,markersState,setMarkers,places,canCick,setCanCick}) {

  //Obtención de la localización del usuario segun entre para centrar el mapa en su ubicación.
  

  //Constantes de las longitudes y latitudes de el marcador que se pone en el mapa ademas de otrs dos duplicados para el uso de guardar el punto.
  const [latitude, setLatitude] = React.useState('');
  const [longitude, setLongitude] = React.useState('');
  
  const [openInfo, setOpenInfo] = React.useState(false);

  //Constante de el marcador, es donde se guarda el marcador actual para mostrarlo en el mapa.
  const markers = markersState;

  /*Logica de cuando clickas en el mapa, se guardan las cordenadas en el marcador para mostrarlo en el mapa,
   *pon a enabled el boton para añadir el punto y guarda las coordenadas para luego guardar el marcador. 
  */

  const onMapClick = (e) => {
    if(canCick){
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

  //Constante de el centro de el mapa cuando se carga, si la geolocalización no falla deberia ser la unicación del usuario.
  const [position, setPosition] = useState({
    lat: Number(latitude), 
    lng: Number(longitude)
  });

  const mapRef = useRef(null);

  function handleCenter() {
    if (!mapRef.current) return;

    const newPos = mapRef.current.getCenter().toJSON();
    if (newPos.lat === position.lat && newPos.lng === position.lng) return
    setPosition(newPos);
  }

  function handleLoad(map) {
    Geolocation.getCurrentPosition((position) =>{
      if(Located){
        setPosition({
          lat: position.coords.latitude,
          lng : position.coords.longitude
        })
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude)
        if(position.coords.latitude !== 0){
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
    setCurrentMapStyle(currentTheme === Themes.LIGHT ? lightMapStyle : darkMapStyle);
  }, [currentTheme]);

  function details(marker){
    console.log(marker);
  }

  //Nos devuelve el mapa con todos los componentes asociados.
  return (
    <div>
      <Snackbar open={openInfo} autoHideDuration={6000} onClose={() => setOpenInfo(false)}>
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          Haga click en el mapa para añadir un punto
        </Alert>
      </Snackbar>

      <OpenIconSpeedDial canClick={setCanCick} openInfo={setOpenInfo}/>
      
      <GoogleMap
        zoom={13}
        center={position}
        mapContainerClassName="map-conteiner"
        onClick={e => onMapClick(e)}
        onLoad={handleLoad}
        onDragEnd={handleCenter}
        options={{
          styles: currentMapStyle,
          fullscreenControl: false,   // Oculta el botón de pantalla completa
          streetViewControl: false,   // Oculta el botón de street view
          mapTypeControl: false       // Oculta el botón de mapa/satélite
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: Number(marker.lat), lng: Number(marker.lng) }}
          />
        ))}
        {places.map((marker) => (
          <MarkerF
            key={marker.id}
            position={{ lat: Number(marker.lat), lng: Number(marker.lng) }}
            onClick={() => details(marker)}
            //options={{icon: {url:(require("./marker.svg").default),scaledSize: {width: 36, height: 36},fillColor:"#34495e"}}}
          />
        ))}
      </GoogleMap>
      
      <FilterButtons />
    </div>
  );
}