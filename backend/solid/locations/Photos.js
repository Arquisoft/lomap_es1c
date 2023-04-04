const locations = require("./Locations.js");

const parser = require("../util/Parser.js");
const serializer = require("../util/Serializer.js");

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

async function getAllFotos(Session, jsonPhotos) {
	return jsonPhotos.map(p => getFoto(Session, p));
}

async function getFoto(Session, jsonPhoto){
	let myUrl = await getPodUrlAll(jsonPhoto.author, { fetch: Session.fetch });
	myUrl = myUrl[0];

	let file = await getFile(myBaseUrl + "LoMap/locations/photos/" + jsonPhoto.id + ".json", {
		fetch: Session.fetch,
	});

	return await parser.parsePhoto(file);
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
