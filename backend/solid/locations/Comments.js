const locations = require("./Locations.js");

async function addComent(Session, coment, idUbicacion, myBaseUrl) {
	let ubicacion = await locations.obtenerLocalizacion(
		Session,
		idUbicacion,
		myBaseUrl
	);
	ubicacion.addRating(coment);
	await locations.addLocation(Session, ubicacion, myBaseUrl);
}

async function getAllComents(Session, idUbicacion, myBaseUrl) {
	let ubicacion = await locations.obtenerLocalizacion(
		Session,
		idUbicacion,
		myBaseUrl
	);
	return ubicacion.coments;
}

async function deleteComentById(Session, idComent, idLocation, myBaseUrl) {
	let ubicacion = await locations.obtenerLocalizacion(
		Session,
		idLocation,
		myBaseUrl
	);
	ubicacion.removeComent(idComent);
	await locations.addLocation(Session, ubicacion, myBaseUrl);
}

module.exports = {
	addComent,
	getAllComents,
	deleteComentById,
};
