const Location = require("../../models/locationModels/Location.js");
const Rating = require("../../models/locationModels/Review.js");
const Coment = require("../../models/locationModels/Comment.js");
const Route = require("../../models/Route.js");
const Foto = require("../../models/locationModels/Photo.js");
const fs = require("fs");

const Localizaciones = require("../locations/Locations.js");

async function parseLocation(location) {
	let locationJson = await getJsonFromBlob(location);

	return new Location(
		locationJson.id,
		locationJson.author,
		locationJson.name,
		locationJson.address,
		locationJson.latitude,
		locationJson.longitude,
		locationJson.category,
		locationJson.date,
		locationJson.comments,
		locationJson.reviews, 
		locationJson.photos
	);

}

async function parseRating(review) {
	let reviewJson = await getJsonFromBlob(review);
	return new Rating(reviewJson.id, reviewJson.author, reviewJson.score, reviewJson.date);
}

async function parseComent(coment) {
	let comentJson = await getJsonFromBlob(coment);
	return new Coment(comentJson.id, comentJson.author, comentJson.coment, comentJson.date);
}

async function parseFoto(foto) {
	let fotoJson = await getJsonFromBlob(coment);
	return new Foto(fotoJson.author, fotoJson.name, fotoJson.url, fotoJson.date, fotoJson.id);
}

async function parseRoute(Session, myBaseUrl, route) {
	let routeJson = await getJsonFromBlob(route);
	let locs = await routeJson.locations.map((id) =>
		Localizaciones.obtenerLocalizacion(Session, id, myBaseUrl)
	);
	return new Route(routeJson.id, routeJson.name, locs);
}

async function getJsonFromBlob(blob) {
	return new Promise((resolve, reject) => {
		fs.readFile(blob, "utf8", (err, data) => {
			if (err) {
				reject(err);
			} else {
				try {
					const json = JSON.parse(data);
					resolve(json.location);
				} catch (error) {
					reject(error);
				}
			}
		});
	});
}
/*
async function getJsonFromBlob(blob) {
	return new Promise((resolve, reject) => {
	  fs.readFile(blob, 'utf8', (err, data) => {
		if (err) {
		  reject(err);
		} else {
		  try {
			const json = JSON.parse(data);
			resolve(json.location);
		  } catch (error) {
			reject(error);
		  }
		}
	  });
	});
  }
*/
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
	parseRoute,
	parseRating,
	parseComent,
};
