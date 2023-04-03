
const Location = require('../models/Location.js');
const Rating = require('../models/Ratings.js');
const Coment = require('../models/Coments.js');
const Route = require('../models/Routes.js');
const Foto = require('../models/Fotos.js');


const Localizaciones = require('./Localizaciones.js');



async function parseLocation(Session, myBaseUrl, location){
  let locationJson = await getJsonFromBlob(location);

  let ratings =  locationJson.reviewScores.map(r => parseRating(r));
  let photos = await locationJson.photos.map(p => parseFoto(Session, myBaseUrl, p));
  let coments =  locationJson.coments.map(c => parseComent(c));

  return new Location(locationJson.id, locationJson.author, locationJson.name, locationJson.address, locationJson.latitude, locationJson.longitude, locationJson.category, ratings, coments, photos);
}


function parseRating(rating){
  return new Rating( rating.id, rating.author, rating.score, rating.date );
}


function parseComent(coment){
  return new Coment( coment.id, coment.author, coment.coment, coment.date );
}

async function parseFoto(Session, myBaseUrl, foto){
  let file = await getFile(
    myBaseUrl + "LoMap/fotos/" + foto.id,
    { fetch: Session.fetch }
  );

  source = getJpegFromBlob(file);

  return new Foto( foto.id, source, foto.author, foto.date );
}

async function parseRoute(Session, myBaseUrl, route){
  let routeJson = await getJsonFromBlob(route);
  let locs = await routeJson.locations.map(id => Localizaciones.obtenerLocalizacion(Session, id, myBaseUrl));
  return new Route(routeJson.id, routeJson.name, locs);
}


async function getJsonFromBlob(blob) {
  const fileReader = new FileReader(); // Objeto para leer el contenido del Blob
  return new Promise((resolve, reject) => {
    fileReader.onloadend = () => {
      try {
        const json = JSON.parse(fileReader.result); // Convertir el contenido del Blob a un objeto JSON
        resolve(json.location); // Retornar la ubicación del objeto JSON
      } catch (error) {
        reject(error); // Si hay un error al convertir el JSON, rechazar la promesa con el error
      }
    };
    fileReader.onerror = reject; // Si hay un error al leer el Blob, rechazar la promesa con el error
    fileReader.readAsText(blob); // Leer el contenido del Blob como texto
  });
}


function getJpegFromBlob(blob) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src); // libera la memoria
      resolve(img);
    };
    img.onerror = () => {
      reject(new Error('No se puede leer el archivo Blob'));
    };
    img.src = URL.createObjectURL(blob);
  });
}


module.exports={
    parseLocation, parseFoto, parseRoute, parseRating, parseComent
  };