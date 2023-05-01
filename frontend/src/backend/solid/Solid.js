import {
	aceptarSolicitud as aceptarSolicitud_,
	deleteFriendById as deleteFriendById_,
	denegarSolicitud as denegarSolicitud_,
	getAllFriends as getAllFriends_,
	getAllSolicitudes as getAllSolicitudes_,
	mandarSolicitud as mandarSolicitud_,
} from "./Friends.js";
import {
	addRoute as addRoute_,
	deleteRouteById as deleteRouteById_,
	getAllRoutes as getAllRoutes_,
	getRouteById as getRouteById_,
} from "./Routes.js";
import { construirEstructura } from "./Structure.js";
import {
	addLocation,
	deleteLocationById as deleteLocationById_,
	obtenerLocalizacion,
	obtenerLocalizaciones,
} from "./locations/Locations.js";
import {
	addPhoto,
	deletePhotoById as deletePhotoById_,
} from "./locations/Photos.js";
import { addReview } from "./locations/Reviews.js";
const { getPodUrlAll } = require("@inrupt/solid-client");

//ESTRUCTURA
//ESTRUCTURA
//ESTRUCTURA
//ESTRUCTURA
//ESTRUCTURA

async function createStruct(Session) {
	const webId = Session.info.webId;
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(webId, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await construirEstructura(Session, myBaseUrl);
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

	await addLocation(Session, location, myBaseUrl);
}

async function getAllLocations(Session, friendwebId) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendwebId, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];
	const result = await obtenerLocalizaciones(Session, myBaseUrl);
	return result;
}

async function getLocationById(Session, idUbi, friendwebId) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendwebId, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	const result = await obtenerLocalizacion(Session, idUbi, myBaseUrl, true);

	return result;
}

// TODO: renombrar
async function deleteLocationById(Session, idLocation, friendwebId) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendwebId, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await deleteLocationById_(Session, idLocation, myBaseUrl);
}

async function getCategories() {
	const categories = [
		"bar",
		"restaurant",
		"shop",
		"supermarket",
		"hotel",
		"cinema",
		"academicInstitution",
		"publicInstitution",
		"sportsClub",
		"museum",
		"park",
		"landscape",
		"monument",
		"hospital",
		"policeStation",
		"transportCenter",
		"entertainment",
		"other",
	];
	return categories;
}

//Review
//Review
//Review
//Review
//Review

async function updateReview(Session, review, friendwebId) {
	await addReview(Session, review);
}

// TODO renombrar
async function deleteReviewById(Session, idRating, friendwebId) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendwebId, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await deleteReviewById(Session, idRating, myBaseUrl);
}

//FOTOS
//FOTOS
//FOTOS
//FOTOS
//FOTOS

async function deletePhotoById(Session, idFoto, friendwebId) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendwebId, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await deletePhotoById_(Session, idFoto, myBaseUrl);
}

async function updatePhoto(Session, photo, friendwebId) {
	await addPhoto(Session, photo);
}

//ROUTES
//ROUTES
//ROUTES
//ROUTES
//ROUTES

async function addRoute(Session, route, friendwebId) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendwebId, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await addRoute_(Session, route, myBaseUrl);
}

async function getAllRoutes(Session, friendwebId) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendwebId, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];
	return await getAllRoutes_(Session, myBaseUrl, false);
}

async function getRouteById(Session, idRoute, friendwebId) {
	let myBaseUrl = await getPodUrlAll(friendwebId, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];
	return await getRouteById_(Session, idRoute, myBaseUrl, true);
}

async function deleteRouteById(Session, idRoute, friendwebId) {
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(friendwebId, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await deleteRouteById_(Session, idRoute, myBaseUrl);
}

//FRIENDS
//FRIENDS
//FRIENDS
//FRIENDS
//FRIENDS

async function aceptarSolicitud(Session, friend) {
	const webId = Session.info.webId;
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(webId, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];
	await aceptarSolicitud_(Session, myBaseUrl, friend);
}

async function denegarSolicitud(Session, friendwebId) {
	const webId = Session.info.webId;
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(webId, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];
	await denegarSolicitud_(Session, myBaseUrl, friendwebId);
}

async function mandarSolicitud(Session, solicitud, nameFriend) {
	const webId = Session.info.webId;
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(webId, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];
	await mandarSolicitud_(Session, myBaseUrl, solicitud, nameFriend);
}

async function getAllSolicitudes(Session) {
	const webId = Session.info.webId;
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(webId, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];
	return await getAllSolicitudes_(Session, myBaseUrl);
}

async function getAllFriends(Session) {
	const webId = Session.info.webId;
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(webId, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];
	return await getAllFriends_(Session, myBaseUrl);
}

async function deleteFriendById(Session, idFriend) {
	const webId = Session.info.webId;
	//Obtencion de url del pod
	let myBaseUrl = await getPodUrlAll(webId, { fetch: Session.fetch });
	myBaseUrl = myBaseUrl[0];

	await deleteFriendById_(Session, idFriend, myBaseUrl);
}

export {
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
	aceptarSolicitud,
	getAllFriends,
	deleteFriendById,
	getCategories,
	denegarSolicitud,
	mandarSolicitud,
	getAllSolicitudes,
	updateReview,
	updatePhoto,
};
