const Localizaciones = require("../locations/Locations.js");
const Route = require("../../models/Route.js");

const {
	getFile
} = require("@inrupt/solid-client");

async function parseRoute(Session, myBaseUrl, routeJson, returnAllLocations) {
	let locations = [];
	if(returnAllLocations){
		locations = await Localizaciones.obtenerLocalizaciones(Session, myBaseUrl);
		locations = locations.filter(l1 => routeJson.locations.filter(l2 => l2 == l1.id).length > 0);
	}

	return new Route(
		routeJson.name,
		routeJson.description,
		routeJson.author,
		routeJson.id,
		locations
	);
}


async function parseContainer(Session, url){
	let file = await getFile(url, {fetch: Session.fetch,});
	return JSON.parse(await file.text());
}

module.exports = {
	parseRoute,
	parseContainer
};
