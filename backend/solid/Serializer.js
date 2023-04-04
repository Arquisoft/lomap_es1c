

const overwriteFile= require ('@inrupt/solid-client');

async function serializeLocation(Session, myBaseUrl, location){

  let ratings = location.rating.map(r => serializeRating(r));
  let photos = location.photos.map(p => serializeFoto(Session, myBaseUrl, p));
  let coments = location.coments.map(c => serializeComent(c));

  let locationJson = { "id":id, "author":location.author, "name":location.name, "address":location.address, "latitude":location.latitude, "longitude":location.longitude, "category":location.category,
                        "reviewScores":ratings, "photos":photos, "coments":coments };

  let blob = new Blob([JSON.stringify(locationJson)], {type: "application/json"});
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

async function serializeFoto(Session, myBaseUrl, foto){
  let blob = new Blob([foto.source], {type: "application/jpeg"});
  let file = new File([blob], foto.id + ".jpeg", {type: blob.type});
  await overwriteFile(
    myBaseUrl + "LoMap/" + "fotos/",
    file,
    { contentType: file.type, fetch: Session.fetch }
  );
  return {"author":foto.author, "date":foto.date, "id":foto.id };
}

function serializeRoute(route){
  let routeJson = { "id":route.id, "name":route.name, "locations":route.locations.map(l => l.id) };

  let blob = new Blob([JSON.stringify(routeJson)], {type: "application/json"});
  let file = new File([blob], route.id + ".json", {type: blob.type});
  return file;
}

function serializeFriend(friend){

}


module.exports={
    serializeLocation, serializeFoto, serializeRoute, serializeRating, serializeComent, serializeFriend
  };