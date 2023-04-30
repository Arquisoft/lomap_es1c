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
async function addReview(Session, review) {
	let myUrl = await getPodUrlAll(Session.info.webId, { fetch: Session.fetch });
	myUrl = myUrl[0];

	let reviewJsonLD = await serializer.serializeReviewComplet(review);

	await serializer.serializeContenedor(
		Session,
		myUrl + "LoMap/locations/reviews.jsonld",
		reviewJsonLD
	);
}

async function getAllReviews(Session, jsonReviews) {
	for (let i = 0; i < jsonReviews.length; i++) {
		jsonReviews[i] = getReview(Session, jsonReviews[i]);
	}
	for (let i = 0; i < jsonReviews.length; i++) {
		jsonReviews[i] = await jsonReviews[i];
	}
	return jsonReviews.filter((r) => r != null);
}

async function getReview(Session, jsonReview) {
	try {
		let myUrl = await getPodUrlAll(jsonReview.author, { fetch: Session.fetch });
		myUrl = myUrl[0];

		let reviewsJson = await parser.parseContainer(
			Session,
			myUrl + "LoMap/locations/reviews.jsonld"
		);
		return parser.parseReview(
			reviewsJson.itemListElement.find((r) => r.id == jsonReview.id)
		);
	} catch (err) {
		return null;
	}
}

async function deleteReviewById(Session, idRating, myBaseUrl) {
	await serializer.deleteThing(
		Session,
		myBaseUrl + "LoMap/locations/reviews.jsonld",
		idRating
	);
}

module.exports = {
	addReview,
	getAllReviews,
	deleteReviewById,
};
