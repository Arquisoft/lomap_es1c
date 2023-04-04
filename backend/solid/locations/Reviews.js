const locations = require("./Locations.js");

const parser = require("../util/Parser.js");
const serializer = require("../util/Serializer.js");


// Añade una review a la carpeta review, no la añade a su location porque de eso ya se encarga addLocation
async function addReview(Session, review) {
	let myUrl = await getPodUrlAll(Session.info.webId, { fetch: Session.fetch });
	myUrl = myUrl[0];

	let file = serializer.serializeReviewComplet(review);

	await overwriteFile(
		myBaseUrl + "LoMap/locations/reviews/" + review.id + ".json",
		file,
		{
			contentType: file.type,
			fetch: Session.fetch,
		}
	);
}

async function getAllReviews(Session, idUbicacion, myBaseUrl) {
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
	addReview,
	getAllReviews,
	deleteRatingById,
};
