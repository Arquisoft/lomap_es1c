import * as React from 'react';
import PlaceConst from './Places/Place'
import addPlace from './Places/Places'

var latMarker;
var lngMarker;


const Button = () => {
  return (
      <button type="button" className='botonAñadir' onClick={ () => añdirPunto()}>Añadir Punto</button>
  );
};

export default Button;

export function añdirPunto(){
  addPlace(PlaceConst(latMarker,lngMarker));
}

export function setLatitudeB(lat){
  latMarker = lat;
}

export function setLongitudeB(lng){
  lngMarker = lng;
}