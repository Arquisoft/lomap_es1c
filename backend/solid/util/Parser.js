const Location = require("../../models/locationModels/Location.js");
const Rating = require("../../models/locationModels/Review.js");
const Coment = require("../../models/locationModels/Comment.js");
const Foto = require("../../models/locationModels/Photo.js");
const Friend = require("../../models/Friend.js");

async function parseLocation(location) {
	let locationJson = await getJsonFromBlob(location);

	return new Location(
		locationJson.name,
		parseFloat(locationJson.latitude),
		parseFloat(locationJson.longitude),
		locationJson.privacy,
		locationJson.author,
		locationJson.category,
		locationJson.id,
		locationJson.date,
		locationJson.comments,
		locationJson.reviews,
		locationJson.photos
	);
}

async function parseReview(review) {
	let reviewJson = await getJsonFromBlob(review);
	return new Rating(reviewJson.rating, reviewJson.author, reviewJson.id);
}

async function parseComment(coment) {
	let comentJson = await getJsonFromBlob(coment);
	return new Coment(
		comentJson.author,
		comentJson.text,
		comentJson.timestamp,
		comentJson.id
	);
}

async function parsePhoto(foto) {
	let fotoJson = await getJsonFromBlob(foto);
	return new Foto(
		fotoJson.author,
		fotoJson.name,
		fotoJson.url,
		fotoJson.timestamp,
		fotoJson.id
	);
}

async function parseFriend(friend){
	let friendJson = await getJsonFromBlob(friend);
	return new Friend(friendJson.name, friendJson.webid, friendJson.id);
}



//XD
async function getJsonFromBlob(blob) {
	const json = JSON.parse(await blob.text());
	return json;
}

function getJpegFromBlob(blob) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			URL.revokeObjectURL(img.src); // libera la memoria
			resolve(img);
		};
		img.onerror = () => {
			reject(new Error("No se puede leer el archivo Blob"));
		};
		img.src = URL.createObjectURL(blob);
	});
}

module.exports = {
	parseLocation,
	parsePhoto,
	parseReview,
	parseComment,
	parseFriend
};
