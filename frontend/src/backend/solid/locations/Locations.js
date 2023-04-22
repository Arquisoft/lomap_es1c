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

const Comments = require("./Comments.js");
const Reviews = require("./Reviews.js");
const Photos = require("./Photos.js");

const { SCHEMA_INRUPT } = require("@inrupt/vocab-common-rdf");

async function addLocation(Session, ubicacion, myBaseUrl) {
	let file = await serializer.serializeLocation(Session, myBaseUrl, ubicacion);

	await overwriteFile(
		myBaseUrl + "LoMap/locations/locations/" + ubicacion.id + ".json",
		file,
		{
			contentType: file.type,
			fetch: Session.fetch,
		}
	);

	//Añado a comentarios, reviews y fotos a sus respectivas carpetas
	ubicacion.reviews.forEach((r) => Reviews.addReview(Session, r));
	ubicacion.photos.forEach((p) => Photos.addFoto(Session, p));
}

async function obtenerLocalizaciones(Session, myBaseUrl) {
	//Obtener url de todas las ubicaciones
	let ubicacionDataset = await getSolidDataset(
		myBaseUrl + "LoMap/locations/locations/",
		{
			fetch: Session.fetch,
		}
	);
	let ubicaciones = getContainedResourceUrlAll(ubicacionDataset);

	let modelsUbi = new Array(ubicaciones.length);
	for (let i = 0; i < ubicaciones.length; i++) {
		let urlSplit = ubicaciones[i].split("/");
		modelsUbi[i] = await obtenerLocalizacion(
			Session,
			urlSplit[urlSplit.length - 1].split(".")[0],
			myBaseUrl
		);
	}

	return modelsUbi;
}

async function obtenerLocalizacion(Session, idUbi, myBaseUrl) {
	let location;
	try {
		let file = await getFile(
			myBaseUrl + "LoMap/locations/locations/" + idUbi + ".json",
			{
				fetch: Session.fetch,
			}
		);

		let location = await parser.parseLocation(file);

		location.reviews = await Reviews.getAllReviews(
			Session,
			location.reviews,
			myBaseUrl
		);
		location.photos = await Photos.getAllPhotos(
			Session,
			location.photos,
			myBaseUrl
		);

		return location;
	} catch (err) {
		throw new Error("Error al obtener la localización Solid: " + err);
	}
}

async function deleteLocationById(Session, idLocation, myBaseUrl) {
	await deleteFile(
		myBaseUrl + "LoMap/locations/locations/" + idLocation + ".json",
		{
			fetch: Session.fetch,
		}
	);
}

module.exports = {
	obtenerLocalizacion,
	obtenerLocalizaciones,
	addLocation,
	deleteLocationById,
};