import {parseContainer, parseRoute, } from "./util/ParserRoute.js";
import {serializeRoute, serializeContenedor, deleteThing} from "./util/Serializer.js";
const {
	getSolidDataset,
	getContainedResourceUrlAll,
	overwriteFile,
	getFile,
	deleteFile,
} = require("@inrupt/solid-client");


async function addRoute(Session, route, myBaseUrl) {
	let routeJsonLd = await serializeRoute(route);
	await serializeContenedor(Session, myBaseUrl + "LoMap/routes.jsonld", routeJsonLd);
}

async function getAllRoutes(Session, myBaseUrl, returnAllLocations) {
	let routesJson = await parseContainer(Session, myBaseUrl + "LoMap/routes.jsonld");
	routesJson.itemListElement = routesJson.itemListElement.map(r => parseRoute(Session, myBaseUrl, r, returnAllLocations));
	for(let i=0;i<routesJson.itemListElement.length;i++){
		routesJson.itemListElement[i] = await routesJson.itemListElement[i];
	}
	return routesJson.itemListElement;
}

async function getRouteById(Session, idRoute, myBaseUrl, returnAllLocations) {
	try {
		let routesJson = await parseContainer(Session, myBaseUrl + "LoMap/routes.jsonld");
		let ruta = routesJson.itemListElement.find(r => r.id === idRoute);
		ruta = await parseRoute(Session, myBaseUrl, ruta, returnAllLocations);
		return ruta;

	} catch (err) {
		return null;
	}
}

async function deleteRouteById(Session, idRoute, myBaseUrl) {
	await deleteThing(Session, myBaseUrl + "LoMap/routes.jsonld", idRoute);
}

export {
	addRoute,
	getAllRoutes,
	getRouteById,
	deleteRouteById,
};
