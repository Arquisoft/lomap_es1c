// Opción 1: OpenLayers

// Imports
import './style.css';
import {Map, View, Feature} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat, toLonLat} from 'ol/proj';
import {Vector as LayerVector} from 'ol/layer';
import {Vector as SourceVector} from 'ol/source';
import {Point} from 'ol/geom';
import {Icon, Style} from 'ol/style.js';

// Las coordenadas falsas a añadir
const coordinates_info = [
  [[4.350, 50.841667], true, 1, "Uno"],
  [[4.351, 50.843667], true, 2, "Dos"],
  [[4.352, 50.845667], true, 3, "Tres"],
  [[4.353, 50.847667], false, 1, "Cuatro"],
  [[4.354, 50.849667], false, 2, "Cinco"],
  [[4.355, 50.842667], false, 3, "Seis"],
  [[4.356, 50.844667], true, 4, "Siete"],
];

// Función que crea el objeto marcador
function getIconFeature(coordinate) {
  return new Feature({
    geometry: new Point(fromLonLat(coordinate))
  })
}

// Función que devuelve el estilo a aplicar a un marcador
function getIconStyle(isMine, category) {
  const colores = ['#FF2D00', '#5DFF00', '#003EFF', '#FFFB00', '#FF00FB'];
  return new Style({
    image: new Icon({
      color: colores[category],
      anchor: [0.5, 1],
      // crossOrigin: 'anonymous',
      src: "my_assets/" + (isMine ? "redondo.svg" : "normal.svg"),
    })
  })
}

// Crear el mapa
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: fromLonLat([4.3525, 50.846667]),  // Posición inicial (ya es Bruselas)
    zoom: 15                                  // Zoom inicial
  })
});

// Añadir los marcadores al mapa
for (const coordinate of coordinates_info) {
  const locationFeature = getIconFeature(coordinate[0]);
  locationFeature.setStyle(
    getIconStyle(coordinate[1], coordinate[2])
  )
  var new_layer = new LayerVector({
    source: new SourceVector({
        features: [locationFeature]
    })
  });
  map.addLayer(new_layer);
}

// Al hacer click en el mapa se obtiene la información de las coordenadas
map.on(
  'click',
  function (evt) {
    const coordinate = evt.coordinate;
    const coordinate_arr = toLonLat(coordinate);
    console.log(coordinate_arr[0] + " , " + coordinate_arr[1]);
  }
)