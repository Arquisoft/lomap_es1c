import {parseLocation, parseContainer} from "../util/Parser.js";
import {serializeLocation, serializeContenedor, deleteThing} from "../util/Serializer.js";
import {getAllReviews, addReview} from "./Reviews.js";
import {getAllPhotos, addPhoto} from "./Photos.js";
const {
	getSolidDataset,
	getContainedResourceUrlAll,
	overwriteFile,
	getFile,
	deleteFile,
	getPodUrlAll,
} = require("@inrupt/solid-client");


const { SCHEMA_INRUPT } = require("@inrupt/vocab-common-rdf");

async function addLocation(Session, ubicacion, myBaseUrl) {
	let jsonLDLocation = await serializeLocation(ubicacion);
	await serializeContenedor(
		Session,
		myBaseUrl + "LoMap/locations/locations.jsonld",
		jsonLDLocation
	);

	//Añado a comentarios, reviews y fotos a sus respectivas carpetas
	ubicacion.reviews.forEach((r) => addReview(Session, r));
	ubicacion.photos.forEach((p) => addPhoto(Session, p));
}

async function obtenerLocalizaciones(Session, myBaseUrl) {
	//Obtener url de todas las ubicaciones

	let locationsJson = await parseContainer(
		Session,
		myBaseUrl + "LoMap/locations/locations.jsonld"
	);
	locationsJson.itemListElement = locationsJson.itemListElement.map((l) =>
		parseLocation(l)
	);

	return locationsJson.itemListElement;
}

async function obtenerLocalizacion(
	Session,
	idUbi,
	myBaseUrl,
	returnAllReviews
) {
	try {
		let locations = await obtenerLocalizaciones(Session, myBaseUrl);

		let location = locations.find((l) => l.id === idUbi);

		if (returnAllReviews) {
			location.reviews = getAllReviews(Session, location.reviews);
			location.photos = getAllPhotos(Session, location.photos);
		} else {
			location.reviews = [];
			location.photos = [];
		}

		location.reviews = await location.reviews;
		location.photos = await location.photos;

		return location;
	} catch (err) {
		return null;
	}
}

async function deleteLocationById(Session, idLocation, myBaseUrl) {
	await deleteThing(
		Session,
		myBaseUrl + "LoMap/locations/locations.jsonld",
		idLocation
	);
}

export {
	obtenerLocalizacion,
	obtenerLocalizaciones,
	addLocation,
	deleteLocationById,
};
