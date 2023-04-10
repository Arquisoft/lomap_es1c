const Localizaciones = require("../locations/Locations.js");
const Route = require("../../models/Route.js");

async function parseRoute(Session, myBaseUrl, route) {
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
};
