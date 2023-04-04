const overwriteFile = require("@inrupt/solid-client");
const { Blob } = require("buffer");
const fs = require("fs");

async function serializeLocation(Session, myBaseUrl, location) {
	let reviews = location.reviews.map((r) => serializeReview(r));
	let photos = location.photos.map((p) =>
		serializePhoto(Session, myBaseUrl, p)
	);
	let comments = location.comments.map((c) => serializeComment(c));

	let locationJson = {
		name: location.name,
		latitude: location.latitude,
		longitude: location.longitude,
		author: location.author,
		category: location.category,
		id: location.id,
		timestamp: location.timestamp,
		reviews: reviews,
		photos: photos,
		comments: comments,
	};

	let blob = new Blob([JSON.stringify(locationJson)], {
		type: "application/json",
	});

	let buffer = Buffer.from(await blob.arrayBuffer());

	return buffer;
}

function serializeReview(review) {
	let ratingJson = {
		rating: review.rating,
		author: review.author,
		id: review.id,
	};
	return ratingJson;
}

function serializeComment(comment) {
	let comentJson = {
		author: comment.author,
		text: comment.text,
		timestamp: comment.timestamp,
		id: comment.id,
	};
	return comentJson;
}
function serializePhoto(photo) {
	let photoJson = {
		author: photo.author,
		name: photo.name,
		url: photo.url,
		timestamp: photo.timestamp,
		id: photo.id,
	};
	return photoJson;
}

/*
async function serializePhoto(Session, myBaseUrl, photo) {
	let blob = new Blob([foto.source], { type: "application/jpeg" });
	let file = new File([blob], foto.id + ".jpeg", { type: blob.type });
	await overwriteFile(myBaseUrl + "LoMap/" + "fotos/", file, {
		contentType: file.type,
		fetch: Session.fetch,
	});
	return { author: foto.author, date: foto.date, id: foto.id };
}

*/
function serializeRoute(route) {
	let routeJson = {
		id: route.id,
		name: route.name,
		locations: route.locations.map((l) => l.id),
	};

	let blob = new Blob([JSON.stringify(routeJson)], {
		type: "application/json",
	});
	let file = new File([blob], route.id + ".json", { type: blob.type });
	return file;
}

function serializeFriend(friend) {}

module.exports = {
	serializeLocation,
	serializePhoto,
	serializeRoute,
	serializeReview,
	serializeComment,
	serializeFriend,
};
