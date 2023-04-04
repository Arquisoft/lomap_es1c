const Location = require("../../models/locationModels/Location.js");
const Rating = require("../../models/locationModels/Review.js");
const Coment = require("../../models/locationModels/Comment.js");
const Route = require("../../models/Route.js");
const Foto = require("../../models/locationModels/Photo.js");
const fs = require("fs");

const Localizaciones = require("../locations/Locations.js");

async function parseLocation(Session, myBaseUrl, location) {
	let locationJson = await getJsonFromBlob(location);

	let ratings = locationJson.reviewScores.map((r) => parseRating(r));
	let photos = await locationJson.photos.map((p) =>
		parseFoto(Session, myBaseUrl, p)
	);
	let coments = locationJson.coments.map((c) => parseComent(c));

	return new Location(
		locationJson.id,
		locationJson.author,
		locationJson.name,
		locationJson.address,
		locationJson.latitude,
		locationJson.longitude,
		locationJson.category,
		ratings,
		coments,
		photos
	);
}

function parseRating(rating) {
	return new Rating(rating.id, rating.author, rating.score, rating.date);
}

function parseComent(coment) {
	return new Coment(coment.id, coment.author, coment.coment, coment.date);
}

async function parseFoto(Session, myBaseUrl, foto) {
	let file = await getFile(myBaseUrl + "LoMap/fotos/" + foto.id, {
		fetch: Session.fetch,
	});

	source = getJpegFromBlob(file);

	return new Foto(foto.id, source, foto.author, foto.date);
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
