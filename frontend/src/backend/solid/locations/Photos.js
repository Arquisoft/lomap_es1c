import {parseContainer, parsePhoto} from "../util/Parser.js";
import {serializeContenedor, deleteThing, serializePhotoComplet} from "../util/Serializer.js";
const {
	overwriteFile,
	getFile,
	deleteFile,
	getPodUrlAll,
} = require("@inrupt/solid-client");


async function addPhoto(Session, foto) {
	let myUrl = await getPodUrlAll(Session.info.webId, { fetch: Session.fetch });
	myUrl = myUrl[0];

	let photoJsonLD = await serializePhotoComplet(foto);
	await serializeContenedor(
		Session,
		myUrl + "LoMap/locations/photos.jsonld",
		photoJsonLD
	);
}

async function getAllPhotos(Session, jsonPhotos) {
	for (let i = 0; i < jsonPhotos.length; i++) {
		jsonPhotos[i] = getPhoto(Session, jsonPhotos[i]);
	}
	for (let i = 0; i < jsonPhotos.length; i++) {
		jsonPhotos[i] = await jsonPhotos[i];
	}
	return jsonPhotos.filter((f) => f !== null);
}

async function getPhoto(Session, jsonPhoto) {
	try {
		let myUrl = await getPodUrlAll(jsonPhoto.author, { fetch: Session.fetch });
		myUrl = myUrl[0];

		let photosJson = await parseContainer(
			Session,
			myUrl + "LoMap/locations/photos.jsonld"
		);
		return parsePhoto(
			photosJson.itemListElement.find((r) => r.id === jsonPhoto.id)
		);
	} catch (err) {
		return null;
	}
}

async function deletePhotoById(Session, idFoto, myBaseUrl) {
	await deleteThing(
		Session,
		myBaseUrl + "LoMap/locations/photos.jsonld",
		idFoto
	);
}

export {
	addPhoto,
	getAllPhotos,
	deletePhotoById,
};
