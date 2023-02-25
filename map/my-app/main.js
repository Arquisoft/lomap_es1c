import './style.css';
import {Map, View, Feature} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import {Vector as LayerVector} from 'ol/layer';
import {Vector as SourceVector} from 'ol/source';
import {Point} from 'ol/geom';
import {Icon, Style} from 'ol/style.js';

const coordinates_info = [
  [[4.350, 50.841667], true, 1],
  [[4.351, 50.843667], true, 2],
  [[4.352, 50.845667], true, 3],
  [[4.353, 50.847667], false, 1],
  [[4.354, 50.849667], false, 2],
  [[4.355, 50.842667], false, 3],
  [[4.356, 50.844667], true, 4],
];

function getIconFeature(coordinate) {
  return new Feature({
    geometry: new Point(fromLonLat(coordinate))
  })
}

function getIconStyle(isMine, category) {
  const colores = ['#FF2D00', '#5DFF00', '#003EFF', '#FFFB00', '#FF00FB'];
  return new Style({
    image: new Icon({
      color: colores[category],
      anchor: [0.5, 1],
      // crossOrigin: 'anonymous',
      src: ruta_imagenes + (isMine ? "redondo.svg" : "normal.svg"),
    })
  })
}

const ruta_imagenes = "my_assets/";

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: fromLonLat([4.3525, 50.846667]),
    zoom: 15
  })
});

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