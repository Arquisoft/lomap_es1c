import React from "react";
import './App.css';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Geolocation from '@react-native-community/geolocation';
import Button from '@mui/material/Button';
import addPlace from './Places/Places'
import PlaceConst from "./Places/Place";
import Modal from 'react-modal';
import Sidebar from './Sidebar';
import './Sidebar.css';

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <Map style={{position:"none"}}/>
    </div>
  );
}

var Located = true;



function Map() {

  Modal.setAppElement(document.getElementsByClassName('map-conteiner')[0]);

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
  const [latitudeMark, setLatitudeMark] = React.useState('');
  const [longitudeMakr, setLongitudeMark] = React.useState('');

  //Constante de el marcador, es donde se guarda el marcador actual para mostrarlo en el mapa.
  const [markers, setMarkers] = React.useState([]);

  /*Logica de cuando clickas en el mapa, se guardan las cordenadas en el marcador para mostrarlo en el mapa,
   *pon a enabled el boton para añadir el punto y guarda las coordenadas para luego guardar el marcador. 
  */
  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        
      },
    ]);
    placedMarker();
    setLatitude(Number(e.latLng.lat()));
    setLongitude(Number(e.latLng.lng()));
    setLatitudeMark(Number(e.latLng.lat()));
    setLongitudeMark(Number(e.latLng.lng()));
    Located = false;
    
  }, []);

  //Constante de el centro de el mapa cuando se carga, si la geolocalización no falla deberia ser la unicación del usuario.
  const center = ({ lat: Number(latitude), lng: Number(longitude) });

  //Variable del boton que nos dice si esta enabled o no, con esto tenemos la posibilidad de hacer un set y cambiar el estado.
  const [disabledB,setDisabledB] = React.useState(true);

  //Muestra un popup modal que nos permite añadir el punto del mapa.
  const añdirPunto = () => {
    
    setIsOpen(true);
    
  }

  //Cambia el estado disabled del boton a false 
  const placedMarker = () =>{
    setDisabledB(false);
  }

  //Constantes para abrir y cerrar el modal.
  const [modalIsOpen, setIsOpen] = React.useState(false);

  let subtitle;
  let form;

  function afterOpenModal() {
    subtitle.style.color = '#8118F8';
    subtitle.style.textAlign  = "center";
    subtitle.style.marginTop  = 0;
    form.style.display = "grid";
    form.style.gridTemplateColumns = "auto";
    form.style.marginBottom = "10px";
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: '#1B3A4B',
    },
  };

  function addPlaceModal(event){
    setDisabledB(true);
    setMarkers([]);
    console.log(nombre);
    addPlace(PlaceConst(latitudeMark,longitudeMakr))
    setIsOpen(false);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [color, setColor] = React.useState(null);

  const [nombre, setNombre] = React.useState('');

  function handleEmailChange (e) {
    setNombre(e.target.value);
 }

  //Nos devuelve el mapa con todos los componentes asociados.
  return (
    <div>
      <Button variant='contained' className='botonAñadir' disabled={disabledB} onClick={añdirPunto}>Añadir Punto</Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Point Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Añade el Punto a el Mapa</h2>
        <form ref={(_form) => (form = _form)}>
          <label htmlFor="nombre">Nombre:  
          <input type="text" name="nombre" placeholder="Nombre" value={nombre} onChange={handleEmailChange} />
          </label>
          <label htmlFor="color">Color del Marcador:  
          <input type="color" id="color" value={color} onChange={e => setColor(e.target.value)} ></input>
          </label>
          <label htmlFor="categoria">Categoria del Marcador:  
          <select id="categoria" name="categoria">
            <option defaultValue="vivienda">Vivienda</option>
            <option value="restaurante">Restaurante</option>
            <option value="bar">Bar</option>
            <option value="yellow">Gimnasio</option>
            <option value="yellow">Supermercado</option>
            <option value="yellow">Gimnasio</option>
            <option value="yellow">Parque</option>
            <option value="yellow">Zona Recreativa</option>
            <option value="yellow">Otros</option>
          </select>
          </label>
          <label htmlFor="comentarios">Comentario: 
          </label>
          <textarea id="comentarios" name="comentarios"/>
        </form>
        <button onClick={addPlaceModal}>Añadir</button>
        <button onClick={closeModal}>Cancelar</button>
      </Modal>
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
