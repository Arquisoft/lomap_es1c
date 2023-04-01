
const getPodUrlAll = require('@inrupt/solid-client');

const estructura = require('./Estructura.js');
const localizaciones = require('./Localizaciones.js');
const reviews = require('./Reviews.js');
const fotos = require('./Fotos.js');
const routes = require('./Routes.js');
const friends = require('./Friends.js');





//ESTRUCTURA
//ESTRUCTURA
//ESTRUCTURA
//ESTRUCTURA
//ESTRUCTURA

async function createStruct(Session) {
  const webID = Session.info.webId;
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(webID, { fetch: Session.fetch });
  myBaseUrl = myBaseUrl[0];

  await estructura.construirEstructura(Session, myBaseUrl);
}

async function isStructCreated(Session) {
  const webID = Session.info.webId;
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(webID, { fetch: Session.fetch });
  myBaseUrl = myBaseUrl[0];

  await estructura.comprobanteEstructura(Session, myBaseUrl);
}






//LOCALIZACIONES
//LOCALIZACIONES
//LOCALIZACIONES
//LOCALIZACIONES
//LOCALIZACIONES

async function saveLocation(Session, ubicacion, friendWebID) {
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
  myBaseUrl = myBaseUrl[0];

  await localizaciones.addLocation(Session, ubicacion, myBaseUrl);
}


async function getAllLocations(Session, friendWebID) {
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
  myBaseUrl = myBaseUrl[0];

  await localizaciones.obtenerLocalizaciones(Session, myBaseUrl);
}


async function getLocationById(Session, idUbi, friendWebID) {
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
  myBaseUrl = myBaseUrl[0];

  await localizaciones.obtenerLocalizacion(Session, idUbi, myBaseUrl);

}


async function deleteLocationById(Session, idLocation, friendWebID) {
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
  myBaseUrl = myBaseUrl[0];

  await localizaciones.deleteLocationById(Session, idLocation, myBaseUrl);
}






//REVIEWS
//REVIEWS
//REVIEWS
//REVIEWS
//REVIEWS

async function addReview(Session, review, idUbicacion, friendWebID) {
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
  myBaseUrl = myBaseUrl[0];

  await reviews.addReview(Session, review, idUbicacion, myBaseUrl);
}





async function getAllReviews(Session, idUbicacion, friendWebID) {
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
  myBaseUrl = myBaseUrl[0];
  await reviews.getAllReviews(Session, idUbicacion, myBaseUrl);

}


async function getReviewById(Session, idReview, friendWebID) {
  let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
  myBaseUrl = myBaseUrl[0];
  await reviews.getReviewById(Session, idReview, myBaseUrl);
}



async function deleteReviewById(Session, idReview, friendWebID) {
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
  myBaseUrl = myBaseUrl[0];

  await reviews.deleteReviewById(Session, idReview, myBaseUrl);
}





//FOTOS
//FOTOS
//FOTOS
//FOTOS
//FOTOS

async function addFoto(Session, foto, idUbicacion, friendWebID) {
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
  myBaseUrl = myBaseUrl[0];

  await fotos.addFoto(Session, foto, idUbicacion, myBaseUrl);
}


async function getAllFotos(Session, idUbicacion, friendWebID) {
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
  myBaseUrl = myBaseUrl[0];
  await fotos.getAllFotos(Session, idUbicacion);

}


async function getFotoById(Session, idFoto, friendWebID) {
  let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
  myBaseUrl = myBaseUrl[0];
  await fotos.getFotoById(Session, idFoto, myBaseUrl);
}


async function deleteFotoById(Session, idFoto, friendWebID) {
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
  myBaseUrl = myBaseUrl[0];

  await fotos.deleteFotoById(Session, idFoto, myBaseUrl);
}





//ROUTES
//ROUTES
//ROUTES
//ROUTES
//ROUTES

async function addRoute(Session, route, friendWebID) {
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
  myBaseUrl = myBaseUrl[0];

  await routes.addRoute(Session, route, myBaseUrl);
}


async function getAllRoutes(Session, friendWebID) {
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
  myBaseUrl = myBaseUrl[0];
  await routes.getAllRoutes(Session, myBaseUrl);

}


async function getRouteById(Session, idRoute, friendWebID) {
  let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
  myBaseUrl = myBaseUrl[0];
  await routes.getRouteById(Session, idRoute, myBaseUrl);
}


async function deleteRouteById(Session, idRoute, friendWebID) {
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
  myBaseUrl = myBaseUrl[0];

  await routes.deleteRouteById(Session, idRoute, myBaseUrl);
}





//FRIENDS
//FRIENDS
//FRIENDS
//FRIENDS
//FRIENDS

async function addFriend(Session, friend) {
  const webID = Session.info.webId;
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(webID, { fetch: Session.fetch });
  myBaseUrl = myBaseUrl[0];

  await friends.addFriend(Session, friend, myBaseUrl);
}


async function getAllFriends(Session) {
  const webID = Session.info.webId;
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(webID, { fetch: Session.fetch });
  myBaseUrl = myBaseUrl[0];
  await friends.getAllFriends(Session);

}



async function deleteFriendById(Session, idFriend) {
  const webID = Session.info.webId;
  //Obtencion de url del pod
  let myBaseUrl = await getPodUrlAll(webID, { fetch: Session.fetch });
  myBaseUrl = myBaseUrl[0];

  await friends.deleteFriendById(Session, idFriend, myBaseUrl);
}


module.exports = {
  createStruct, isStructCreated, saveLocation, addReview, getAllLocations, getLocationById, getAllReviews, getReviewById, deleteLocationById, deleteReviewById,
  addFoto, getAllFotos, getFotoById, deleteFotoById, addRoute, getAllRoutes, getRouteById, deleteRouteById, addFriend, getAllFriends, deleteFriendById
};
