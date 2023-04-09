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

	const result = await locations.obtenerLocalizacion(Session, idUbi, myBaseUrl);
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

//COMENTS
//COMENTS
//COMENTS
//COMENTS
//COMENTS

async function addComment(Session, coment, idUbicacion, friendWebID) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await coments.addComment(Session, coment, idUbicacion, myBaseUrl);
}

async function getAllComments(Session, idUbicacion, friendWebID) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];
	await coments.getAllComments(Session, idUbicacion, myBaseUrl);
}

async function deleteCommentById(Session, idComent, friendWebID) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await coments.deleteCommentById(Session, idComent, myBaseUrl);
}

//Review
//Review
//Review
//Review
//Review

async function addReview(Session, rating, idUbicacion, friendWebID) {
	//Obtencion de url del pod
	let friendUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
	friendUrl = friendUrl[0];

	await ratings.addReview(Session, rating, idUbicacion, friendUrl);
}

async function getAllReviews(Session, idUbicacion, friendWebID) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];
	await ratings.getAllRatings(Session, idUbicacion, myBaseUrl);
}

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

async function addPhoto(Session, foto, idUbicacion, friendWebID) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await fotos.addFoto(Session, foto, idUbicacion, myBaseUrl);
}

async function getAllPhotos(Session, idUbicacion, friendWebID) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendWebID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];
	await fotos.getAllPhotos(Session, idUbicacion, myBaseUrl);
}

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
	return await routes.getAllRoutes(Session, myBaseUrl);
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

async function addFriend(Session, idFriend) {
	const webID = Session.info.webId;
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(webID, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	let friendBaseUrl = await getPodUrlAll(idFriend, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await friends.addFriend(Session, idFriend, myBaseUrl, friendBaseUrl);
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

	let friendBaseUrl = await getPodUrlAll(idFriend, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await friends.deleteFriendById(Session, idFriend, myBaseUrl, friendBaseUrl);
}

module.exports = {
	createStruct,
	saveLocation,
	getAllLocations,
	getLocationById,
	deleteLocationById,
	addComment,
	getAllComments,
	deleteCommentById,
	addReview,
	getAllReviews,
	deleteReviewById,
	addPhoto,
	getAllPhotos,
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
