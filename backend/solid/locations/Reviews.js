const {
	overwriteFile,
	getFile,
	deleteFile,
	getPodUrlAll
} = require("@inrupt/solid-client");

const locations = require("./Locations.js");

const parser = require("../util/Parser.js");
const serializer = require("../util/Serializer.js");


// Añade una review a la carpeta review, no la añade a su location porque de eso ya se encarga addLocation
async function addReview(Session, review) {
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
}

async function getAllReviews(Session, jsonReviews) {

	for(let i=0;i<jsonReviews.length;i++){
		jsonReviews[i] = await getReview(Session, jsonReviews[i]);
	}
	return jsonReviews.filter(r => r != null);
}

async function getReview(Session, jsonReview){
	try{
		let myUrl = await getPodUrlAll(jsonReview.author, { fetch: Session.fetch });
		myUrl = myUrl[0];
	
		let file = await getFile(myUrl + "LoMap/locations/reviews/" + jsonReview.id + ".json", {
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
