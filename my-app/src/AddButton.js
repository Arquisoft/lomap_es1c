import * as React from 'react';
import PlaceConst from './Places/Place'
import addPlace from './Places/Places'
import Button from '@mui/material/Button';

var latMarker;
var lngMarker;
var disabledB = true;

const ButtonAdd = () => {
  return (
      <Button variant='contained' className='botonAñadir' disabled={disabledB} onClick={ () => añdirPunto()}>Añadir Punto</Button>
  );
};

export default ButtonAdd;

export function añdirPunto(){
  disabledB = true;
  ButtonAdd();
  addPlace(PlaceConst(latMarker,lngMarker));
}

export function disabledBCheck(){
  console.log(disabledB);

  return disabledB;
}

export function setLatitudeB(lat){
  latMarker = lat;
}

export function setLongitudeB(lng){
  lngMarker = lng;
}

export function changeFalseDisabled(){
  disabledB = false;
}