const { overwriteFile, getFile } = require("@inrupt/solid-client");

const parser = require("../util/Parser.js");

async function serializeLocation(location) {
	let reviews = location.reviews.map((r) => serializeReview(r));
	let photos = location.photos.map((p) => serializePhoto(p));

	let locationJson = {
		"@context": "https://schema.org",
		"@type": "Place",
		name: location.name,
		latitude: location.latitude,
		longitude: location.longitude,
		author: location.author,
		category: location.category,
		id: location.id,
		timestamp: location.timestamp,
		reviews: reviews,
		photos: photos,
	};

	return locationJson;
}

// Se utilizan para serializar la informacion que va en locations, no la que va en las carpetas reviews, comments y photos
function serializeReview(review) {
	let ratingJson = {
		"@context": "https://schema.org",
		"@type": "Review",
		author: review.author,
		id: review.id,
	};
	return ratingJson;
}

function serializePhoto(photo) {
	let photoJson = {
		"@context": "https://schema.org",
		"@type": "photo",
		author: photo.author,
		id: photo.id,
	};
	return photoJson;
}

async function serializeReviewComplet(review) {
	// Se utiliza para serializar la informacion de las reviews que va en la carpeta reviews
	let ratingJson = {
		"@context": "https://schema.org",
		"@type": "Review",
		rating: review.rating,
		author: review.author,
		comment: review.comment,
		id: review.id,
	};

	return ratingJson;
}

async function serializePhotoComplet(photo) {
	// Se utiliza para serializar la informacion de las photos que va en la carpeta photos
	let photoJson = {
		"@context": "https://schema.org",
		"@type": "photo",
		author: photo.author,
		name: photo.name,
		imageJPG: photo.imageJPG,
		timestamp: photo.timestamp,
		id: photo.id,
	};

	return photoJson;
}

async function serializeRoute(route) {
	let routeJson = {
		"@context": "https://schema.org",
		"@type": "itinerary",
		id: route.id,
		name: route.name,
		locations: route.locations.map((l) => l.id),
		description: route.description,
		author: route.author,
	};

	return routeJson;
}

async function serializeFriend(friend) {
	let friendJson = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: friend.name,
		webId: friend.webId,
		id: friend.id,
	};

	return friendJson;
}

async function serializeSolicitud(solicitud) {
	let solicitudJson = {
		"@context": "https://schema.org",
		"@type": "Message",
		sender: solicitud.sender,
		receiver: solicitud.receiver,
		id: solicitud.id,
	};

	return solicitudJson;
}

async function serializeContenedor(Session, url, jsonLDToAdd) {
	let jsonContainer = await parser.parseContainer(Session, url);
	jsonContainer.itemListElement = jsonContainer.itemListElement.filter(
		(j) => j.id != jsonLDToAdd.id
	);

	jsonContainer.itemListElement.push(jsonLDToAdd);

	await saveJsonLD(Session, url, jsonContainer);
}

async function deleteThing(Session, url, idThing) {
	let jsonContainer = await parser.parseContainer(Session, url);

	jsonContainer.itemListElement = jsonContainer.itemListElement.filter(
		(t) => t.id != idThing
	);

	await saveJsonLD(Session, url, jsonContainer);
}

async function saveJsonLD(Session, url, jsonContainer) {
	let blob = new Blob([JSON.stringify(jsonContainer)], {
		type: "application/jsonld",
	});

	const arrayBuffer = await blob.arrayBuffer();
	const buffer = new Uint8Array(arrayBuffer);

	await overwriteFile(url, buffer, {
		contentType: buffer.type,
		fetch: Session.fetch,
	});
}

module.exports = {
	serializeLocation,
	serializePhoto,
	serializeRoute,
	serializeReview,
	serializeFriend,
	serializeReviewComplet,
	serializePhotoComplet,
	serializeContenedor,
	deleteThing,
	saveJsonLD,
	serializeSolicitud,
};
