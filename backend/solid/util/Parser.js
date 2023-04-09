const Location = require("../../models/locationModels/Location.js");
const Rating = require("../../models/locationModels/Review.js");
const Coment = require("../../models/locationModels/Comment.js");
const Foto = require("../../models/locationModels/Photo.js");


async function parseLocation(location) {
	let locationJson = await getJsonFromBlob(location);

	return new Location(
		locationJson.name,
		parseInt(locationJson.latitude),
		parseInt(locationJson.longitude),
		locationJson.description,
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
	return new Rating(
		reviewJson.rating,
		reviewJson.author,
		reviewJson.id,
	);
}

async function parseComent(coment) {
	let comentJson = await getJsonFromBlob(coment);
	return new Coment(
		comentJson.author,
		comentJson.text,
		comentJson.timestamp,
		comentJson.id,
	);
}

async function parseFoto(foto) {
	let fotoJson = await getJsonFromBlob(foto);
	return new Foto(
		fotoJson.author,
		fotoJson.name,
		fotoJson.url,
		fotoJson.timestamp,
		fotoJson.id
	);
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
	parseFoto,
	parseReview,
	parseComent,
};
