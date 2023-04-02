
const Location = require('../models/Location');
const Review = require('../models/Review');
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


function serializeReview(review){

}

function serializeFoto(foto){

}

function serializeRoute(route){

}


module.exports={
    serializeLocation, serializeReview, serializeFoto, serializeRoute
  };