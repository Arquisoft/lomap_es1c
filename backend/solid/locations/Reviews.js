const locations = require("./Locations.js");

async function addRating(Session, rating, idUbicacion, myBaseUrl) {
	let ubicacion = await locations.obtenerLocalizacion(
		Session,
		idUbicacion,
		myBaseUrl
	);
	ubicacion.addRating(rating);
	await locations.addLocation(Session, ubicacion, myBaseUrl);
}

async function getAllRatings(Session, idUbicacion, myBaseUrl) {
	let ubicacion = await locations.obtenerLocalizacion(
		Session,
		idUbicacion,
		myBaseUrl
	);
	return ubicacion.ratings;
}

async function deleteRatingById(Session, idRating, idLocation, myBaseUrl) {
	let ubicacion = await locations.obtenerLocalizacion(
		Session,
		idLocation,
		myBaseUrl
	);
	ubicacion.removeRating(idRating);
	await locations.addLocation(Session, ubicacion, myBaseUrl);
}

module.exports = {
	addRating,
	getAllRatings,
	deleteRatingById,
};
