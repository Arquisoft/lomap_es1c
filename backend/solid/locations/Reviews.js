const {
	overwriteFile,
	getFile,
	deleteFile,
	getPodUrlAll,
} = require("@inrupt/solid-client");

const locations = require("./Locations.js");

const parser = require("../util/Parser.js");
const serializer = require("../util/Serializer.js");

// Añade una review a la carpeta review, no la añade a su location porque de eso ya se encarga addLocation
async function addReview(Session, review, idUbicacion, friendUrl) {
	let myUrl = await getPodUrlAll(Session.info.webId, { fetch: Session.fetch });
	myUrl = myUrl[0];

	let file = await serializer.serializeReviewComplet(review);

	await overwriteFile(
		myUrl + "LoMap/locations/reviews/" + review.id + ".json",
		file,
		{
			contentType: file.type,
			fetch: Session.fetch,
		}
	);
	//TODO
	//SACAR OBJETO LOCATION DE LA FRIENDURL CON EL IDUBICACION Y AÑADIR LA URL DE LA REVIEW QQUEA ACABAS DE GUARDAR
}

async function getAllReviews(Session, jsonReviews) {
	for (let i = 0; i < jsonReviews.length; i++) {
		jsonReviews[i] = await getReview(Session, jsonReviews[i]);
	}
	return jsonReviews.filter((r) => r != null);
}

async function getReview(Session, jsonReview) {
	try {
		let myUrl = await getPodUrlAll(jsonReview.author, { fetch: Session.fetch });
		myUrl = myUrl[0];

		let file = await getFile(
			myUrl + "LoMap/locations/reviews/" + jsonReview.id + ".json",
			{
				fetch: Session.fetch,
			}
		);

		return await parser.parseReview(file);
	} catch (err) {
		return null;
	}
}

async function deleteReviewById(Session, idRating, myBaseUrl) {
	await deleteFile(
		myBaseUrl + "LoMap/locations/reviews/" + idRating + ".json",
		{
			fetch: Session.fetch,
		}
	);
}

module.exports = {
	addReview,
	getAllReviews,
	deleteReviewById,
};
