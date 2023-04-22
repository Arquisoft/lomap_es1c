const { getPodUrlAll } = require("@inrupt/solid-client");
const estructura = require("./Structure.js");
const locations = require("./locations/Locations.js");
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
		idUbi,
		myBaseUrl,
		true
	);
	return result;
}

async function deleteLocationById(Session, idLocation, friendWebID) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await locations.deleteLocationById(Session, idLocation, myBaseUrl);
}

async function getCategories() {
	const categories = [
		"Restaurante",
		"Punto de Interés",
		"Tienda",
		"Parque",
		"Ocio",
	];
	return categories;
}

//Review
//Review
//Review
//Review
//Review

async function deleteReviewById(Session, idRating, friendWebID) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await ratings.deleteReviewById(Session, idRating, myBaseUrl);
}

//FOTOS
//FOTOS
//FOTOS
//FOTOS
//FOTOS

async function deletePhotoById(Session, idFoto, friendWebID) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await fotos.deletePhotoById(Session, idFoto, myBaseUrl);
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
	return await routes.getAllRoutes(Session, myBaseUrl, false);
}

async function getRouteById(Session, idRoute, friendWebID) {
	let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];
	return await routes.getRouteById(Session, idRoute, myBaseUrl, true);
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
	await friends.addFriend(Session, myBaseUrl, friend);
}

async function getAllFriends(Session) {
	const webID = Session.info.webId;
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(webID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];
	return await friends.getAllFriends(Session, myBaseUrl);
}

async function deleteFriendById(Session, idFriend) {
	const webID = Session.info.webId;
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(webID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await friends.deleteFriendById(Session, idFriend, myBaseUrl);
}

module.exports = {
	createStruct,
	saveLocation,
	getAllLocations,
	getLocationById,
	deleteLocationById,
	deleteReviewById,
	deletePhotoById,
	addRoute,
	getAllRoutes,
	getRouteById,
	deleteRouteById,
	addFriend,
	getAllFriends,
	deleteFriendById,
	getCategories,
};
