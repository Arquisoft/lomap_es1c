const Localizaciones = require("../locations/Locations.js");
const Route = require("../../models/Route.js");

async function parseRoute(Session, myBaseUrl, route) {
	let routeJson = JSON.parse(await route.text());

	for (let i = 0; i < routeJson.locations.length; i++) {
		let location = await Localizaciones.obtenerLocalizacion(
			Session,
			routeJson.locations[i],
			myBaseUrl
		);
		if (location != null) {
			routeJson.locations[i];
		} else {
			routeJson.locations.splice(i, 1);
		}
	}

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
};
