const locations = require("./Locations.js");

const parser = require("../util/Parser.js");
const serializer = require("../util/Serializer.js");

// Añade una comment a la carpeta comment, no la añade a su location porque de eso ya se encarga addLocation
async function addComent(Session, coment) {
	let myUrl = await getPodUrlAll(Session.info.webId, { fetch: Session.fetch });
	myUrl = myUrl[0];

	let file = serializer.serializeCommentComplet(coment);

	await overwriteFile(
		myBaseUrl + "LoMap/locations/comments/" + coment.id + ".json",
		file,
		{
			contentType: file.type,
			fetch: Session.fetch,
		}
	);
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
