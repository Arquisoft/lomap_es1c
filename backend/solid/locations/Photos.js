const locations = require("./Locations.js");

const serializer = require("../util/Serializer.js");

// Añade una photo a la carpeta photo, no la añade a su location porque de eso ya se encarga addLocation
async function addFoto(Session, foto) {
	let myUrl = await getPodUrlAll(Session.info.webId, { fetch: Session.fetch });
	myUrl = myUrl[0];

	let file = serializer.serializePhotoComplet(foto);

	await overwriteFile(
		myBaseUrl + "LoMap/locations/photos/" + foto.id + ".json",
		file,
		{
			contentType: file.type,
			fetch: Session.fetch,
		}
	);
}

async function getAllFotos(Session, idUbicacion, myBaseUrl) {
	let ubicacion = await locations.obtenerLocalizacion(
		Session,
		idUbicacion,
		myBaseUrl
	);
	return ubicacion.photos;
}

async function deleteFotoById(Session, idFoto, idUbicacion, myBaseUrl) {
	let ubicacion = await locations.obtenerLocalizacion(
		Session,
		idUbicacion,
		myBaseUrl
	);
	ubicacion.removePhoto(idFoto);
	await locations.addLocation(Session, ubicacion, myBaseUrl);
}

module.exports = {
	addFoto,
	getAllFotos,
	deleteFotoById,
};
