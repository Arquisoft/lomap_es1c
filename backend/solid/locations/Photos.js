const {
	overwriteFile,
	getFile,
	deleteFile,
	getPodUrlAll,
} = require("@inrupt/solid-client");

const locations = require("./Locations.js");

const parser = require("../util/Parser.js");
const serializer = require("../util/Serializer.js");

async function addPhoto(Session, foto) {
	let myUrl = await getPodUrlAll(Session.info.webId, { fetch: Session.fetch });
	myUrl = myUrl[0];

	let file = await serializer.serializePhotoComplet(foto);

	await overwriteFile(
		myUrl + "LoMap/locations/photos/" + foto.id + ".json",
		file,
		{
			contentType: file.type,
			fetch: Session.fetch,
		}
	);
}

async function getAllPhotos(Session, jsonPhotos) {
	for (let i = 0; i < jsonPhotos.length; i++) {
		jsonPhotos[i] = await getPhoto(Session, jsonPhotos[i]);
	}
	return jsonPhotos.filter((f) => f != null);
}

async function getPhoto(Session, jsonPhoto) {
	try {
		let myUrl = await getPodUrlAll(jsonPhoto.author, { fetch: Session.fetch });
		myUrl = myUrl[0];

		let file = await getFile(
			myUrl + "LoMap/locations/photos/" + jsonPhoto.id + ".json",
			{
				fetch: Session.fetch,
			}
		);

		return await parser.parsePhoto(file);
	} catch (err) {
		return null;
	}
}

async function deletePhotoById(Session, idFoto, myBaseUrl) {
	await deleteFile(myBaseUrl + "LoMap/locations/photos/" + idFoto + ".json", {
		fetch: Session.fetch,
	});
}

module.exports = {
	addPhoto,
	getAllPhotos,
	deletePhotoById,
};
