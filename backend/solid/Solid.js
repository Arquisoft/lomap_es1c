const { getPodUrlAll } = require("@inrupt/solid-client");
const estructura = require("./Structure.js");
const locations = require("./locations/Locations.js");
const coments = require("./locations/Comments.js");
const ratings = require("./locations/Reviews.js");
const fotos = require("./locations/Photos.js");
const routes = require("./Routes.js");
const friends = require("./Friends.js");

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

//LOCALIZACIONES
//LOCALIZACIONES
//LOCALIZACIONES
//LOCALIZACIONES
//LOCALIZACIONES

async function saveLocation(Session, location, webId) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(webId, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await locations.addLocation(Session, location, myBaseUrl);
}

async function getAllLocations(Session, friendWebID) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	const result = await locations.obtenerLocalizaciones(Session, myBaseUrl);
	return result;
}

async function getLocationById(Session, idUbi, friendWebID) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	const result = await locations.obtenerLocalizacion(
		Session,
		idUbi + ".json",
		myBaseUrl
	);
	return result;
}

async function deleteLocationById(Session, idLocation, friendWebID) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await locations.deleteLocationById(Session, idLocation + ".json", myBaseUrl);
}

//COMENTS
//COMENTS
//COMENTS
//COMENTS
//COMENTS

async function addComent(Session, coment, idUbicacion, friendWebID) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await coments.addComent(Session, coment, idUbicacion, myBaseUrl);
}

async function getAllComents(Session, idUbicacion, friendWebID) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];
	await coments.getAllComents(Session, idUbicacion, myBaseUrl);
}

async function deleteComentById(Session, idComent, idLocation, friendWebID) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await coments.deleteComentById(Session, idComent, idLocation, myBaseUrl);
}

//RATINGS
//RATINGS
//RATINGS
//RATINGS
//RATINGS

async function addRating(Session, rating, idUbicacion, friendWebID) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await ratings.addRating(Session, rating, idUbicacion, myBaseUrl);
}

async function getAllRatings(Session, idUbicacion, friendWebID) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];
	await ratings.getAllRatings(Session, idUbicacion, myBaseUrl);
}

async function deleteRatingById(Session, idRating, idLocation, friendWebID) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await ratings.deleteRatingById(Session, idRating, idLocation, myBaseUrl);
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
	await fotos.getAllFotos(Session, idUbicacion, myBaseUrl);
}

async function deleteFotoById(Session, idFoto, idUbicacion, friendWebID) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await fotos.deleteFotoById(Session, idFoto, idUbicacion, myBaseUrl);
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

	let friendBaseUrl = await getPodUrlAll(friend.id, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await friends.addFriend(Session, friend, myBaseUrl, friendBaseUrl);
}

async function getAllFriends(Session) {
	const webID = Session.info.webId;
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(webID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];
	await friends.getAllFriends(Session, myBaseUrl);
}

async function deleteFriendById(Session, idFriend) {
	const webID = Session.info.webId;
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(webID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	let friendBaseUrl = await getPodUrlAll(friend.id, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await friends.deleteFriendById(Session, idFriend, myBaseUrl, friendBaseUrl);
}

module.exports = {
	createStruct,
	saveLocation,
	getAllLocations,
	getLocationById,
	deleteLocationById,
	addComent,
	getAllComents,
	deleteComentById,
	addRating,
	getAllRatings,
	deleteRatingById,
	addFoto,
	getAllFotos,
	deleteFotoById,
	addRoute,
	getAllRoutes,
	getRouteById,
	deleteRouteById,
	addFriend,
	getAllFriends,
	deleteFriendById,
};
