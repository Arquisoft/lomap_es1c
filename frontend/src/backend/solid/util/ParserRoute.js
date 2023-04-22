const Localizaciones = require("../locations/Locations.js");
const Route = require("../../models/Route.js");

async function parseRoute(Session, myBaseUrl, route) {
	let routeJson = JSON.parse(await route.text());
	let locations = [];
	for (let i = 0; i < routeJson.locations.length; i++) {
		let location = await Localizaciones.obtenerLocalizacion(
			Session,
			routeJson.locations[i],
			myBaseUrl
		);
		if (location != null) {
			locations.push(location);
		}
	}

	return new Route(
		routeJson.name,
		routeJson.description,
		routeJson.author,
		routeJson.id,
		locations
	);
}
async function parseMinimalRoute(Session, myBaseUrl, route) {
	let routeJson = JSON.parse(await route.text());
	return new Route(
		routeJson.name,
		routeJson.description,
		routeJson.author,
		routeJson.id,
		routeJson.locations
	);
}

module.exports = {
	parseRoute,
	parseMinimalRoute,
};