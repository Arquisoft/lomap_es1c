const {
	getSolidDataset,
	getContainedResourceUrlAll,
	overwriteFile,
	getFile,
	deleteFile,
} = require("@inrupt/solid-client");

const parser = require("./util/ParserRoute.js");
const serializer = require("./util/Serializer.js");
const locations = require("./locations/Locations.js");

async function addRoute(Session, route, myBaseUrl) {
	let routeJsonLd = await serializer.serializeRoute(route);
	await serializer.serializeContenedor(Session, myBaseUrl + "LoMap/routes.jsonld", routeJsonLd);
}

async function getAllRoutes(Session, myBaseUrl, returnAllLocations) {
	let routesJson = await parser.parseContainer(Session, myBaseUrl + "LoMap/routes.jsonld");
	routesJson.itemListElement = routesJson.itemListElement.map(r => parser.parseRoute(Session, myBaseUrl, r, returnAllLocations));
	for(let i=0;i<routesJson.itemListElement.length;i++){
		routesJson.itemListElement[i] = await routesJson.itemListElement[i];
	}
	return routesJson.itemListElement;
}

async function getRouteById(Session, idRoute, myBaseUrl, returnAllLocations) {
	try {
		let routesJson = await parser.parseContainer(Session, myBaseUrl + "LoMap/routes.jsonld");
		let ruta = routesJson.itemListElement.find(r => r.id == idRoute);
		ruta = await parser.parseRoute(Session, myBaseUrl, ruta, returnAllLocations);
		return ruta;

	} catch (err) {
		return null;
	}
}

async function deleteRouteById(Session, idRoute, myBaseUrl) {
	await serializer.deleteThing(Session, myBaseUrl + "LoMap/routes.jsonld", idRoute);
}

module.exports = {
	addRoute,
	getAllRoutes,
	getRouteById,
	deleteRouteById,
};
