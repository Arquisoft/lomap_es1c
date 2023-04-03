
const Location = require('../models/Location');
const Rating = require('../models/Ratings');
const Coment = require('../models/Coments');
const Route = require('../models/Route');
const Foto = require('../models/Foto');






function serializeLocation(location){
        /*let structJson = { "locations":[], "routes":[] };

  let blob = new Blob([JSON.stringify(structJson)], {tupe: "application/json"});
  let file = new File([blob], "locations.json", {type: blob.type});
  
  await overwriteFile(
    myBaseUrl,
    file,
    { contentType: file.type, fetch: Session.fetch }
  );*/
}


function serializeRating(rating){

}


function serializeComent(coment){

}

function serializeFoto(foto){

}

function serializeRoute(route){

}


module.exports={
    serializeLocation, serializeFoto, serializeRoute, serializeRating, serializeComent
  };