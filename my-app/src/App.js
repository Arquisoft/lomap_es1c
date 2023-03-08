import './App.css';
import './Sidebar.css';
import Props from "./Sidebar";
import CreateMap from './Mapa/Map';
import React from "react";
import CreateModal from './Mapa/PlacesForm';

export default function App() {
  //Estados de la aplicacion
  //Latitud y longitud del marcador actual que tu pongas en el mapa.
    const [latitude, setLatitude] = React.useState('');
    const [longitude, setLongitude] = React.useState('');
  
    //Constante de el marcador, es donde se guarda el marcador actual para mostrarlo en el mapa.
    const [markers, setMarkers] = React.useState([]);

    //Controla si el boton para añadir marcador a puntos esta activado, este boton saca el popup con el formulario
    const [disabledB,setDisabledB] = React.useState(true);

    //Todos los lugares de la aplicacion
    const [places,setPlaces] = React.useState([]);

    //Constantes del Modal
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal(boolean){
      setIsOpen(boolean)
    }


  return (
    <div>
      <Props />

      <CreateModal isOpen={modalIsOpen} latMark={latitude}
      lngMark={longitude} setIsOpen={setIsOpen} setMarkers={setMarkers} setStateButton={setDisabledB}
      setPlaces={setPlaces} />

      <CreateMap open={openModal} setLatitude={setLatitude} setLongitude={setLongitude} markers={markers} 
      setMarkers={setMarkers} buttonState={disabledB} setStateButton={setDisabledB} places={places}/>
    </div>
  );
}
