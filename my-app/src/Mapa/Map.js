import React from "react";
import { GoogleMap, useLoadScript, Marker, MarkerF } from "@react-google-maps/api";
import { Themes, ThemeContext } from '../contexts/ThemeContext';
import Geolocation from '@react-native-community/geolocation';
import Button from '@mui/material/Button';
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
//import {addPlace,getPlaces} from '../Places/Places';
//import PlaceConst from "../Places/Place";

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

const lightMapStyle = [];

export default function CreateMap({open,setLatitude,setLongitude,markers,setMarkers,buttonState,setStateButton,places}) {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) return <div>Loading...</div>;
    return (
      <div>
        <Map openModal={open} setLatitudeMark={setLatitude} setLongitudeMark={setLongitude} markersState={markers}
        setMarkers={setMarkers} button={buttonState} setButtonState={setStateButton} 
        places={places} style={{position:"none"}}/>
      </div>
    );
  }


var Located = true;

function Map({openModal,setLongitudeMark,setLatitudeMark,markersState,setMarkers,button,setButtonState,places}) {

  //Obtención de la localización del usuario segun entre para centrar el mapa en su ubicación.
  Geolocation.getCurrentPosition((position) =>{
    if(Located){
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude)
    }
  }
  );

  //Constantes de las longitudes y latitudes de el marcador que se pone en el mapa ademas de otrs dos duplicados para el uso de guardar el punto.
  const [latitude, setLatitude] = React.useState('');
  const [longitude, setLongitude] = React.useState('');

  //Constante de el marcador, es donde se guarda el marcador actual para mostrarlo en el mapa.
  const markers = markersState;

  /*Logica de cuando clickas en el mapa, se guardan las cordenadas en el marcador para mostrarlo en el mapa,
   *pon a enabled el boton para añadir el punto y guarda las coordenadas para luego guardar el marcador. 
  */
   

  const onMapClick = (e) => {
    setMarkers((current) => [current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        
      },
    ]);
    placedMarker();
    setLatitude(Number(e.latLng.lat()));
    setLongitude(Number(e.latLng.lng()));
    Located = false;
    
  };

  //Constante de el centro de el mapa cuando se carga, si la geolocalización no falla deberia ser la unicación del usuario.
  const center = ({ lat: Number(latitude), lng: Number(longitude) });

  //Variable del boton que nos dice si esta enabled o no, con esto tenemos la posibilidad de hacer un set y cambiar el estado.
  const disabledB = button;

  //Cambia el estado disabled del boton a false 
  const placedMarker = () =>{
    setButtonState(false);
  }

  function openModalContext(){
    setLatitudeMark(Number(latitude));
    setLongitudeMark(Number(longitude));
    openModal(true);
  }

  const { currentTheme } = useContext(ThemeContext);
  const [currentMapStyle, setCurrentMapStyle] = useState();

  useEffect(() => {
    setCurrentMapStyle(currentTheme === Themes.LIGHT ? lightMapStyle : darkMapStyle);
  }, [currentTheme]);

  //Nos devuelve el mapa con todos los componentes asociados.
  return (
    <div>
      <Button
        variant='contained'
        className='botonAñadir'
        disabled={disabledB}
        onClick={openModalContext}
      >
        Añadir Punto
      </Button>
      
      <GoogleMap
        zoom={13}
        center={center}
        mapContainerClassName="map-conteiner"
        onClick={e => onMapClick(e)}
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
            position={{ lat: Number(marker.lat), lng: Number(marker.lng) }} />
        ))}
        {places.map((marker) => (
          <MarkerF
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: Number(marker.lat), lng: Number(marker.lng) }}
            options = {{background:marker.color}}
          />
        ))}
      </GoogleMap>
    </div>
  );
}