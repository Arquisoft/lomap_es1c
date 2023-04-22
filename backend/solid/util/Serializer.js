const overwriteFile = require("@inrupt/solid-client");
const { Blob } = require("buffer");
const fs = require("fs");

async function serializeLocation(Session, myBaseUrl, location) {
	let reviews = location.reviews.map((r) => serializeReview(r));
	let photos = location.photos.map((p) =>
		serializePhoto(p)
	);
	let comments = location.comments.map((c) => serializeComment(c));

	let locationJson = {
		name: location.name,
		latitude: location.latitude,
		longitude: location.longitude,
		privacy: location.privacy,
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

// Se utilizan para serializar la informacion que va en locations, no la que va en las carpetas reviews, comments y photos
function serializeReview(review) {
	let ratingJson = {
		//rating: review.rating,        esto va en la carpeta review del author
		author: review.author,
		id: review.id,
	};
	return ratingJson;
}

function serializeComment(comment) {
	let comentJson = {
		author: comment.author,
		//text: comment.text,             esto va en la carpeta comment del author
		timestamp: comment.timestamp,
		id: comment.id,
	};
	return comentJson;
}
function serializePhoto(photo) {
	let photoJson = {
		author: photo.author,
		/*name: photo.name,
		url: photo.url,  
		timestamp: photo.timestamp,       todo esto va en la carpeta photo del author*/
		id: photo.id,
	};
	return photoJson;
}

async function serializeReviewComplet(review) {
	// Se utiliza para serializar la informacion de las reviews que va en la carpeta reviews
	let ratingJson = {
		rating: review.rating,
		author: review.author,
		id: review.id,
	};

	let blob = new Blob([JSON.stringify(ratingJson)], {
		type: "application/json",
	});

	let buffer = Buffer.from(await blob.arrayBuffer());

	return buffer;
}

async function serializeCommentComplet(comment) {
	// Se utiliza para serializar la informacion de los comments que va en la carpeta comments
	let comentJson = {
		author: comment.author,
		text: comment.text,
		timestamp: comment.timestamp,
		id: comment.id,
	};

	let blob = new Blob([JSON.stringify(comentJson)], {
		type: "application/json",
	});

	let buffer = Buffer.from(await blob.arrayBuffer());

	return buffer;
}
async function serializePhotoComplet(photo) {
	// Se utiliza para serializar la informacion de las photos que va en la carpeta photos
	let photoJson = {
		author: photo.author,
		name: photo.name,
		url: photo.url,
		timestamp: photo.timestamp,
		id: photo.id,
	};

	let blob = new Blob([JSON.stringify(photoJson)], {
		type: "application/json",
	});

	let buffer = Buffer.from(await blob.arrayBuffer());

	return buffer;
}

async function serializeRoute(route) {
	let routeJson = {
		id: route.id,
		name: route.name,
		locations: route.locations.map((l) => l.id),
		description: route.description,
		author: route.author,
	};

	let blob = new Blob([JSON.stringify(routeJson)], {
		type: "application/json",
	});
	let buffer = Buffer.from(await blob.arrayBuffer());

	return buffer;
}

async function serializeFriend(friend) {
	let friendJson = {
		name: friend.name,
		webid: friend.webid,
		id: friend.id,
	};

	let blob = new Blob([JSON.stringify(friendJson)], {
		type: "application/json",
	});

	let buffer = Buffer.from(await blob.arrayBuffer());

	return buffer;
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

module.exports = {
	serializeLocation,
	serializePhoto,
	serializeRoute,
	serializeReview,
	serializeComment,
	serializeFriend,
	serializeReviewComplet,
	serializeCommentComplet,
	serializePhotoComplet,
};
