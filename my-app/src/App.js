import React from "react";
import './App.css';
import * as button from './AddButton';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Geolocation from '@react-native-community/geolocation';

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map style={{position:"none"}}/>;
}

function Map() {
  const [latitude, setLatitude] = React.useState('');
  const [longitude, setLongitude] = React.useState('');

  Geolocation.getCurrentPosition((position) =>{
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude)
  }
  );

  const [markers, setMarkers] = React.useState([]);

    const onMapClick = React.useCallback((e) => {
      setMarkers((current) => [current,
        {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        },
      ]);
      button.setLatitudeB(e.latLng.lat());
      button.setLongitudeB(e.latLng.lng());
    }, []);

  const center = ({ lat: Number(latitude), lng: Number(longitude) });

  return (
    <div>
      <button.default />
      <GoogleMap zoom={13} center={center} mapContainerClassName="map-conteiner" onClick={e => onMapClick(e)}>
      {markers.map((marker) => (
        <Marker
          key={`${marker.lat}-${marker.lng}`}
          position={{ lat: Number(marker.lat), lng: Number(marker.lng) }} />
        ))}
      </GoogleMap>
    </div>
  );
}
