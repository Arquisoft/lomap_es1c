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

async function getAllReviews(Session, jsonReviews) {
	let reviews = jsonReviews.map(r => getReview(Session, r));
	return reviews.filter(r => r != null);
}

async function getReview(Session, jsonReview){
	try{
		let myUrl = await getPodUrlAll(jsonReview.author, { fetch: Session.fetch });
		myUrl = myUrl[0];
	
		let file = await getFile(myBaseUrl + "LoMap/locations/reviews/" + jsonReview.id + ".json", {
			fetch: Session.fetch,
		});
	
		return await parser.parseReview(file);
	}
	catch(err){
		return null;
	}
}

async function deleteReviewById(Session, idRating) {
	let myUrl = await getPodUrlAll(jsonComment.author, { fetch: Session.fetch });
	myUrl = myUrl[0];

	await deleteFile(myUrl + "LoMap/locations/photos" + idRating + ".json", {
	fetch: Session.fetch,
	});
}

module.exports = {
	addReview,
	getAllReviews,
	deleteReviewById,
};
