
const Location = require('../models/Location');
const Rating = require('../models/Ratings');
const Coment = require('../models/Coments');
const Route = require('../models/Route');
const Foto = require('../models/Foto');






async function serializeLocation(location){

  let ratings = location.rating.map(r => serializeRating(r));
  let photos = location.photos.map(p => serializeFoto(p));
  let coments = location.coments.map(c => serializeComent(c));

  let locationJson = { "name":location.name, "address":location.address, "latitude":location.latitude, "longitude":location.longitude, "category":location.category,
                        "reviewScores":ratings, "photos":photos, "coments":coments };

  let blob = new Blob([JSON.stringify(locationJson)], {tupe: "application/json"});
  let file = new File([blob], location.id + ".json", {type: blob.type});
  
  return file;
}


function serializeRating(rating){
  let ratingJson = { "author":rating.author, "score":rating.score, "date":rating.date };
  return ratingJson;
}


function serializeComent(coment){
  let comentJson = { "author":coment.author, "coment":coment.coment, "date":coment.date };
  return comentJson;
}

async function serializeFoto(foto){

}

function serializeRoute(route){

}


module.exports={
    serializeLocation, serializeFoto, serializeRoute, serializeRating, serializeComent
  };