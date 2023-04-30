import Location from "../../models/locationModels/Location.js";
import Rating from "../../models/locationModels/Review.js";
import Photo from "../../models/locationModels/Photo.js";
import Friend from "../../models/Friend.js";
import Request from "../../models/FriendRequest.js";

import {getFile} from "@inrupt/solid-client";

function parseLocation(locationJson) {
	return new Location(
		locationJson.name,
		parseFloat(locationJson.latitude),
		parseFloat(locationJson.longitude),
		locationJson.author,
		locationJson.category,
		locationJson.id,
		locationJson.date,
		locationJson.reviews.map((r) => {
			return { id: r.id, author: r.author };
		}),
		locationJson.photos.map((p) => {
			return { id: p.id, author: p.author };
		})
	);
}

function parseReview(reviewJson) {
	return new Rating(
		reviewJson.rating,
		reviewJson.comment,
		reviewJson.author,
		reviewJson.id
	);
}

function parsePhoto(fotoJson) {
	return new Photo(
		fotoJson.author,
		fotoJson.imageJPG,
		fotoJson.timestamp,
		fotoJson.id
	);
}

function parseFriend(friendJson) {
	return new Friend(friendJson.name, friendJson.webId, friendJson.id);
}

function parseSolicitud(solicitudJson) {
	return new Request(
		solicitudJson.sender,
		solicitudJson.receiver,
		solicitudJson.id
	);
}

async function parseContainer(Session, url) {
	let file = await getFile(url, { fetch: Session.fetch });
	return JSON.parse(await file.text());
}

export {
	parseLocation,
	parsePhoto,
	parseReview,
	parseFriend,
	parseContainer,
	parseSolicitud,
};
