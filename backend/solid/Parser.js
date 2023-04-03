
const Location = require('../models/Location.js');
const Rating = require('../models/Ratings.js');
const Coment = require('../models/Coments.js');
const Route = require('../models/Routes.js');
const Foto = require('../models/Fotos.js');






async function parseLocation(location){
  let locationJson = await getJsonFromBlob(location);

  let ratings =  locationJson.reviewScores.map(r => parseRating(r));
  let photos = await locationJson.photos.map(p => parseFoto(Session, myBaseUrl, p));
  let coments =  locationJson.coments.map(c => parseComent(c));

  return new Location(locationJson.id, locationJson.name, locationJson.address, locationJson.latitude, locationJson.longitude, locationJson.category, ratings, coments, photos);
}


function parseRating(rating){

}


function parseComent(coment){

}

async function parseFoto(Session, myBaseUrl, foto){
  let file = await getFile(
    myBaseUrl + "LoMap/fotos/" + foto.id,
    { fetch: Session.fetch }
  );
}

async function parseRoute(route){

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


module.exports={
    parseLocation, parseFoto, parseRoute, parseRating, parseComent
  };