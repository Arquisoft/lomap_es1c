const {
	getSolidDataset,
	getContainedResourceUrlAll,
	overwriteFile,
	getFile,
	deleteFile,
	getPodUrlAll,
} = require("@inrupt/solid-client");

const parser = require("../util/Parser.js");
const serializer = require("../util/Serializer.js");

const Reviews = require("./Reviews.js");
const Photos = require("./Photos.js");

const { SCHEMA_INRUPT } = require("@inrupt/vocab-common-rdf");

async function addLocation(Session, ubicacion, myBaseUrl) {
	let jsonLDLocation = await serializer.serializeLocation(ubicacion);
	await serializer.serializeContenedor(Session, myBaseUrl + "LoMap/locations/locations.jsonld", jsonLDLocation);

	//Añado a comentarios, reviews y fotos a sus respectivas carpetas
	ubicacion.reviews.forEach((r) => Reviews.addReview(Session, r));
	ubicacion.photos.forEach((p) => Photos.addPhoto(Session, p));
}


async function obtenerLocalizaciones(Session, myBaseUrl) {
	//Obtener url de todas las ubicaciones
	let locationsJson = await parser.parseContainer(Session, myBaseUrl + "LoMap/locations/locations.jsonld");
	locationsJson.itemListElement = locationsJson.itemListElement.map((l) => parser.parseLocation(l));
	return locationsJson.itemListElement;
}

async function obtenerLocalizacion(Session, idUbi, myBaseUrl, returnAllReviews) {
	try {
		let locations = await obtenerLocalizaciones(Session, myBaseUrl);

		let location = locations.find((l) => l.id == idUbi);

		if(returnAllReviews){
			location.reviews = Reviews.getAllReviews(
				Session,
				location.reviews
			);
			location.photos = Photos.getAllPhotos(
				Session,
				location.photos
			);
		}
		else{
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
	await serializer.deleteThing(Session, myBaseUrl + "LoMap/locations/locations.jsonld", idLocation);
}

module.exports = {
	obtenerLocalizacion,
	obtenerLocalizaciones,
	addLocation,
	deleteLocationById,
};
