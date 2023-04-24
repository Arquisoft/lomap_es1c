const Location = require("../../models/locationModels/Location.js");
const Rating = require("../../models/locationModels/Review.js");
const Foto = require("../../models/locationModels/Photo.js");
const Friend = require("../../models/Friend.js");
const Request = require("../../models/Request.js");

const { getFile } = require("@inrupt/solid-client");

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
	return new Foto(
		fotoJson.author,
		fotoJson.name,
		fotoJson.url,
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

module.exports = {
	parseLocation,
	parsePhoto,
	parseReview,
	parseFriend,
	parseContainer,
	parseSolicitud,
};
